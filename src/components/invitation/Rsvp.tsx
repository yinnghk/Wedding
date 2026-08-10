import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function Rsvp() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"신랑측" | "신부측">("신랑측");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<"참석" | "불참석">("참석");
  const [guestCount, setGuestCount] = useState("1"); // 기본값 1명
  const [companion, setCompanion] = useState("");
  const [meal, setMeal] = useState<"예정" | "안함" | "미정">("예정");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setPhone("");
    setGuestCount("1");
    setCompanion("");
    setMeal("예정");
    setMessage("");
  };

  const submit = async () => {
    if (!name.trim()) {
      toast.error("성함을 입력해주세요");
      return;
    }

    setSubmitting(true);

    const parsedGuestCount =
      attendance === "참석" ? parseInt(guestCount, 10) || 1 : 0;

    const { error } = await supabase.from("rsvp_submissions").insert({
      side,
      name: name.trim(),
      phone: phone.trim() || null,
      attendance,
      guest_count: parsedGuestCount,
      companion: attendance === "참석" ? companion.trim() || null : null,
      meal_preference: attendance === "참석" ? meal : "안함",
      message: message.trim() || null,
    });

    setSubmitting(false);

    if (error) {
      toast.error("전송에 실패했습니다");
      return;
    }

    toast.success("참석 의사가 전달되었습니다");
    setOpen(false);
    resetForm();
  };

  return (
    <section className="bg-[#ffffff] px-3 py-20 text-center">
      <section className="px-6 max-w-[340px] mx-auto">
        <div className="text-center">
          <h2
            className="text-2xl text-stone-800"
            style={{ fontFamily: '"Noto Serif KR", serif' }}
          >
            RSVP
          </h2>
          <p className="mt-2 text-xs text-stone-400">
            참석 여부를 알려주시면 준비에 큰 도움이 됩니다
          </p>
        </div>

        {/* 버튼 클릭 시 모달 열림 */}
        <button
          onClick={() => setOpen(true)}
          className="mt-6 inline-flex w-full max-w-xs items-center justify-center rounded-xl bg-[#8c7b7b] py-3.5 text-sm font-medium text-white shadow-sm transition active:scale-[0.98] hover:bg-[#7a6a6a]"
        >
          참석 의사 전달하기
        </button>

        {/* 바텀 시트 팝업 모달 */}
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 transition-opacity"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-[440px] max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-serif text-lg text-stone-800">
                    참석 의사 전달
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    정성스런 마음으로 모시겠습니다
                  </p>
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
                  <label className="block text-xs font-medium text-stone-500 mb-2">
                    구분
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100/70 rounded-xl">
                    {(["신랑측", "신부측"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSide(s)}
                        className={`py-2 rounded-lg text-xs font-medium transition ${
                          side === s
                            ? "bg-white text-stone-800 shadow-xs"
                            : "text-stone-400 hover:text-stone-600"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. 성함 & 연락처 & 참석여부 */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1.5">
                      성함 <span className="text-rose-400">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 transition"
                      placeholder="성함을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1.5">
                      연락처
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 transition"
                      placeholder="연락처를 입력해주세요 (선택)"
                      type="tel"
                    />
                  </div>

                  <div className="pt-1">
                    <label className="block text-xs font-medium text-stone-500 mb-1.5">
                      참석 여부
                    </label>
                    <div className="grid grid-cols-2 gap-2">
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
                </div>

                {/* 참석 선택 시에만 세부 항목 표시 */}
                {attendance === "참석" && (
                  <div className="space-y-4 pt-2 border-t border-dashed border-stone-200 animate-in fade-in duration-200">
                    {/* 3. 참석 인원 */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1.5">
                        참석 인원 (본인 포함)
                      </label>
                      <input
                        value={guestCount}
                        onChange={(e) =>
                          setGuestCount(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 transition"
                        placeholder="숫자만 입력 (예: 1)"
                        inputMode="numeric"
                      />
                    </div>

                    {/* 4. 동행인 */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1.5">
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
                      <label className="block text-xs font-medium text-stone-500 mb-1.5">
                        식사 여부
                      </label>
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

                {/* 6. 추가 전달 사항 */}
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1.5">
                    전달 메시지
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 resize-none focus:bg-white focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 transition"
                    placeholder="신랑, 신부에게 전달할 메모나 메시지가 있다면 남겨주세요 (선택)"
                  />
                </div>

                {/* 제출 버튼 */}
                <div className="pt-2">
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="w-full rounded-xl bg-[#5c5454] py-3 text-sm font-medium text-white shadow-sm transition active:scale-[0.98] hover:bg-[#4a4343] disabled:opacity-50"
                  >
                    {submitting ? "전송 중…" : "참석 의사 전달하기"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}