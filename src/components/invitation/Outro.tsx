import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import intro from "@/assets/intro3.gif";

export function Outro() {
  const copy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 복사되었습니다.");
    }
  };

  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"신랑측" | "신부측">("신랑측");
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"참석" | "불참석">("참석");
  const [guestCount, setGuestCount] = useState("");
  const [companion, setCompanion] = useState("");
  const [meal, setMeal] = useState<"예정" | "안함" | "미정">("예정");
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
      guest_count: attendance === "참석" && guestCount ? parseInt(guestCount) : 0,
      companion: attendance === "참석" ? companion.trim() || null : null,
      meal_preference: attendance === "참석" ? meal : "안함",
    });
    setSubmitting(false);

    if (error) {
      toast.error("전송에 실패했습니다");
      return;
    }

    toast.success("참석 의사가 전달되었습니다");
    setOpen(false);
    setName("");
    setGuestCount("");
    setCompanion("");
  };

  return (
    <section className="bg-[#ffffff] py-20 text-center">
      <div className="invitation-container">
        <div className="text-center">
          <h2
            className="text-2xl text-stone-800"
            style={{ fontFamily: '"Noto Serif KR", serif' }}
          >
            RSVP
          </h2>
        </div>

        <p className="mt-4 leading-relaxed text-sm text-primary/60">
          원활한 예식 진행 및 식사 준비를 위해
        </p>
        <p className="leading-relaxed text-sm text-primary/60">
          참석 여부를 미리 전달해주시면 감사하겠습니다
        </p>

        <div className="mt-6 relative w-full rounded-2xl overflow-hidden shadow-sm border border-stone-200/60">
          <img
            src={intro}
            alt="Wedding Intro"
            className="w-full h-full object-cover animate-intro"
          />
        </div>

        {/* 참석 의사 전달하기 버튼 */}
        <div className="mt-6">
          <button
            onClick={() => setOpen(true)}
            className="w-full rounded-2xl bg-stone-800 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-stone-700 active:scale-[0.98] transition-all"
          >
            참석 의사 전달하기
          </button>
        </div>

        {/* 바텀 시트 팝업 모달 */}
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 transition-opacity font-sans"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-[440px] max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-bold text-stone-800">참석 의사 전달</h3>
                  <p className="text-xs text-stone-400 mt-0.5">정성스런 마음으로 모시겠습니다</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:bg-stone-100 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 폼 입력 영역 */}
              <div className="mt-5 space-y-5 text-sm text-stone-700">
                {/* 1. 구분 (신랑측 / 신부측) */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-2">구분</label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100/70 rounded-xl">
                    {(["신랑측", "신부측"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSide(s)}
                        className={`py-2 rounded-lg text-xs font-medium transition ${
                          side === s
                            ? "bg-white text-stone-800 shadow-xs font-semibold"
                            : "text-stone-400 hover:text-stone-600"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. 성함 & 참석여부 */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-2">
                    성함 <span className="text-rose-400">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 transition"
                    placeholder="성함을 입력해주세요"
                  />
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(["참석", "불참석"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setAttendance(s)}
                        className={`py-2.5 rounded-xl border text-xs font-medium transition ${
                          attendance === s
                            ? "border-stone-800 bg-stone-800 text-white"
                            : "border-stone-200 bg-white text-stone-500 hover:bg-stone-50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 참석 선택 시에만 세부 항목 표시 */}
                {attendance === "참석" && (
                  <div className="space-y-4 pt-1 border-t border-dashed border-stone-200 animate-in fade-in duration-200">
                    {/* 3. 참석 인원 */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-2">
                        참석 인원 (본인 포함)
                      </label>
                      <input
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value.replace(/\D/g, ""))}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 transition"
                        placeholder="숫자만 입력 (예: 2)"
                        inputMode="numeric"
                      />
                    </div>

                    {/* 4. 동행인 */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-2">
                        동행인 성함
                      </label>
                      <input
                        value={companion}
                        onChange={(e) => setCompanion(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 transition"
                        placeholder="동행인이 있으실 경우 입력해주세요"
                      />
                    </div>

                    {/* 5. 식사 여부 */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-2">식사 여부</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["예정", "안함", "미정"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setMeal(s)}
                            className={`py-2 rounded-xl border text-xs font-medium transition ${
                              meal === s
                                ? "border-stone-700 bg-stone-100 text-stone-800 font-semibold"
                                : "border-stone-200 bg-white text-stone-400 hover:bg-stone-50"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 제출 버튼 */}
                <div className="pt-2">
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="w-full rounded-xl bg-stone-800 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-stone-700 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {submitting ? "전송 중…" : "참석 의사 전달하기"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 청첩장 전달하기 버튼 */}
        <div className="mt-3">
          <button
            onClick={copy}
            className="w-full rounded-2xl bg-stone-200/80 hover:bg-stone-200 py-3.5 text-sm font-medium text-stone-700 active:scale-[0.98] transition-all"
          >
            청첩장 링크 복사하기
          </button>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-primary/60">
          소중한 날 귀한 걸음으로 축하해주셔서 감사합니다
        </p>

        <p className="mt-6 text-xs text-stone-400/60 tracking-wider">
          made by hxunhwang
        </p>
      </div>
    </section>
  );
}