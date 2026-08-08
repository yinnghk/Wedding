import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HIDE_KEY = "rsvp_hidden_date";
const AUTO_KEY = "rsvp_auto_shown_date";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function Rsvp() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"신랑측" | "신부측">("신랑측");
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"참석" | "불참석">("참석");
  const [guestCount, setGuestCount] = useState("");
  const [companion, setCompanion] = useState("");
  const [meal, setMeal] = useState<"예정" | "안함" | "미정">("예정");
  const [hideToday, setHideToday] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      toast.error("성함을 입력해주세요");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("rsvp_submissions").insert({
      side,
      name: name.trim(),
      attendance,
      guest_count: guestCount ? parseInt(guestCount) : null,
      companion: companion.trim() || null,
      meal_preference: meal,
    });
    setSubmitting(false);
    if (error) {
      toast.error("전송에 실패했습니다");
      return;
    }
    if (hideToday) localStorage.setItem(HIDE_KEY, todayKey());
    toast.success("참석 의사가 전달되었습니다");
    setOpen(false);
    setName("");
    setGuestCount("");
    setCompanion("");
  };

  return (
    <section className="px-6 text-center">
      <h2 
          className="text-2xl"
          style={{ fontFamily: '"Noto Serif KR", serif' }}>
        참석 의사 전달</h2>
      <p className="mt-3 text-sm text-foreground/70">
        참석 여부를 미리 알려주시면
        <br />결혼식 준비에 큰 도움이 됩니다.
      </p>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-md active:scale-95 transition"
      >
        참석 의사 전달하기
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-[480px] rounded-t-3xl bg-white p-6 pb-8 shadow-2xl animate-fade-up text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">참석 의사 전달</h3>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-muted"><X size={16} /></button>
            </div>

            <div className="mt-5 space-y-5 text-sm">
              <div>
                <label className="block text-foreground/70 mb-2">구분</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["신랑측", "신부측"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSide(s)}
                      className={`py-2.5 rounded-full border transition ${
                        side === s ? "border-transparent bg-primary text-primary-foreground font-medium" : "bg-card border-border"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-foreground/70 mb-2">성함</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="성함을 입력해주세요"
                />
                <div className="mt-2 flex gap-2">
                  {(["참석", "불참석"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setAttendance(s)}
                      className={`flex-1 py-2 rounded-full border text-sm ${
                        attendance === s ? "border-transparent bg-primary text-primary-foreground font-medium" : "bg-white border-primary/15"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-foreground/70 mb-2">참석인원</label>
                <input
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-2.5 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="본인 포함 총 참석인원"
                  inputMode="numeric"
                />
              </div>

              <div>
                <label className="block text-foreground/70 mb-2">동행인</label>
                <input
                  value={companion}
                  onChange={(e) => setCompanion(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="함께 오시는 분 성함"
                />
              </div>

              <div>
                <label className="block text-foreground/70 mb-2">식사여부</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["예정", "안함", "미정"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setMeal(s)}
                      className={`py-2 rounded-full border text-sm ${
                        meal === s ? "border-transparent bg-primary text-primary-foreground font-medium" : "bg-white border-primary/15"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-foreground/70">
                <input type="checkbox" checked={hideToday} onChange={(e) => setHideToday(e.target.checked)} />
                오늘 하루 보지 않기
              </label>

              <button
                onClick={submit}
                disabled={submitting}
                className="w-full py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-sm disabled:opacity-50"
              >
                {submitting ? "전송 중…" : "참석 의사 전달하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
