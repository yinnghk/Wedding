import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-12-12T16:00:00+09:00");

function useCountdown() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now ? Math.max(0, WEDDING_DATE.getTime() - now.getTime()) : 0;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}


function Calendar() {
  // December 2026: Dec 1, 2026 is a Tuesday
  const firstDay = new Date(2026, 11, 1).getDay(); // 0=Sun
  const daysInMonth = 31;
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="p-5">
      <p className="text-center font-serif text-lg">12월</p>
      <div className="mt-3 grid grid-cols-7 gap-y-2 text-center text-xs">
        {weekdays.map((w, i) => (
          <div key={w} className={`font-medium ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-foreground/60"}`}>
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          const isWedding = d === 12;
          const col = i % 7;
          return (
            <div key={i} className="flex items-center justify-center h-9">
              {d ? (
                isWedding ? (
                  <div className="relative flex h-10 w-10 items-center justify-center">
                  <span className="absolute text-4xl text-pink-300 leading-none">♥</span>
                  <span className="relative z-10 text-xs font-bold text-white">
                    {d}
                  </span>
                </div>
                ) : (
                  <span className={col === 0 ? "text-red-400" : col === 6 ? "text-blue-400" : "text-foreground/80"}>
                    {d}
                  </span>
                )
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <section className="bg-[#ffffff] px-6 py-12 text-center">
      <section className="px-6">
        <div className="text-center">
          <h2 
            className="text-2xl"
            style={{ fontFamily: '"Noto Serif KR", serif' }}>
            Wedding Day</h2>

          <p className="mt-6 leading-relaxed text-sm">
          2026년 12월 12일 토요일 오후 4시
          </p>
          <p className="mt-1 leading-relaxed text-sm">
          로얄파크컨벤션 1F 파크홀
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 py-10">
          <span className="h-px w-70 bg-primary/20" />
        </div>

        <div className>
          <Calendar />
        </div>

        <div className="flex items-center justify-center gap-3 py-10">
          <span className="h-px w-70 bg-primary/20" />
        </div>


        <div className="p-5">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { l: "DAYS", v: days },
              { l: "HOURS", v: hours },
              { l: "MIN", v: minutes },
              { l: "SEC", v: seconds },
            ].map((c) => (
              <div 
                key={c.l} 
                className="rounded-xl bg-white py-2.5 border border-primary/10 shadow-lg shadow-primary/5"
              >
                <p className="font-serif text-lg tabular-nums text-foreground">{String(c.v).padStart(2, "0")}</p>
                <p className="text-[10px] tracking-widest text-foreground/50 mt-0.5">{c.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-foreground/80">
            <span className="serif">이황</span>
            <span className="mx-1 text-primary">♥</span>
            <span className="serif">남궁현경</span>
            의 결혼식이{" "}
            <span className="font-bold text-primary">{days}</span>일 남았습니다
          </p>
        </div>
      </section>
    </section>
  );
}
