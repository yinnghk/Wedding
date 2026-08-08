import { MapPin, Car, Train, Bus, Navigation } from "lucide-react";

const ADDRESS = "서울특별시 용산구 이태원로 29";
const KAKAO = `https://map.kakao.com/link/search/${encodeURIComponent(ADDRESS)}`;
const NAVER = `https://map.naver.com/v5/search/${encodeURIComponent(ADDRESS)}`;

export function Location() {
  return (
    <section className="bg-[#ffffff] px-4 py-12 text-center sm:px-6">
      <div className="mx-auto max-w-md">
        {/* 헤더 */}
        <div className="mb-8 space-y-1">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">LOCATION</span>
          <h2 
            className="text-2xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: '"Noto Serif KR", serif' }}
          >
            오시는 길
          </h2>
        </div>

        {/* 지도 영역 */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-xs">
          <iframe
            title="지도"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
            className="h-60 w-full border-0 grayscale-[0.2] transition-all duration-300 hover:grayscale-0"
            loading="lazy"
          />
        </div>

        {/* 주소 및 내비게이션 버튼 */}
        <div className="mt-4 rounded-2xl bg-muted/40 p-5 text-left border border-border/40">
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="font-serif text-sm font-medium leading-tight text-foreground">{ADDRESS}</p>
              <p className="mt-1 text-xs text-muted-foreground">전쟁기념관 내 위치</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <a
              href={NAVER}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2.5 text-xs font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]"
            >
              <Navigation className="size-3.5 text-[#03C75A]" />
              네이버 지도
            </a>
            <a
              href={KAKAO}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2.5 text-xs font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]"
            >
              <Navigation className="size-3.5 text-[#FEE500] fill-[#3C1E1E]" />
              카카오맵
            </a>
          </div>
        </div>

        {/* 교통 수단 안내 */}
        <div className="mt-6 space-y-3 text-left">
          {/* 주차 */}
          <div className="flex gap-4 rounded-2xl border border-border/40 bg-card p-4 shadow-2xs">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Car className="size-4" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-foreground">주차 안내</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                전쟁기념관 지상·지하 주차장 이용 가능 <span className="font-medium text-foreground">(2시간 무료)</span>
              </p>
            </div>
          </div>

          {/* 지하철 */}
          <div className="flex gap-4 rounded-2xl border border-border/40 bg-card p-4 shadow-2xs">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Train className="size-4" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-foreground">지하철</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#6E352C] text-[10px] font-bold text-white">6</span>
                  <span><strong className="font-medium text-foreground">삼각지역 12번 출구</strong> (도보 5분)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#00A2D1] text-[10px] font-bold text-white">4</span>
                  <span><strong className="font-medium text-foreground">삼각지역 1번 출구</strong> (도보 9분)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#002D84] text-[10px] font-bold text-white">1</span>
                  <span><strong className="font-medium text-foreground">남영역 1번 출구</strong> (도보 14분)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 버스 */}
          <div className="flex gap-4 rounded-2xl border border-border/40 bg-card p-4 shadow-2xs">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bus className="size-4" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-foreground">버스</p>
              <div className="mt-1.5 space-y-2 text-xs text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">전쟁기념관 하차</p>
                  <p className="mt-0.5 leading-relaxed">110A, 110B, 421, 740, N72, N75, 용산03</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">삼각지역 하차</p>
                  <p className="mt-0.5 leading-relaxed">
                    421, 100, 150, 151, 152, 500, 501, 502, 504, 506, 507, 605, 742, 750A, 750B, 752
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}