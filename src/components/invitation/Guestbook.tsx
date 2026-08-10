import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Message = {
  id: string;
  author: string;
  content: string;
  color_index?: number;
  created_at: string;
};

// 카드 배경색 옵션 (은은한 모바일 청첩장 톤)
const CARD_BG_STYLES = [
  "bg-white/90 border-stone-200/60",
  "bg-[#fcf8f2]/90 border-[#e8dfd1]/80",
  "bg-[#f4f0ea]/90 border-[#e2dad0]/80",
];

export function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAllModalOpen, setIsAllModalOpen] = useState(false); // 전체 메시지 모달 상태

  useEffect(() => {
    supabase
      .from("guestbook_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => data && setMessages(data as Message[]));

    const channel = supabase
      .channel("guestbook")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook_messages" },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const submit = async () => {
    if (!author.trim() || !content.trim()) {
      toast.error("이름과 메시지를 입력해주세요");
      return;
    }
    setSubmitting(true);
    
    // 무작위 색상 인덱스 부여 (0~2)
    const colorIndex = Math.floor(Math.random() * CARD_BG_STYLES.length);

    const { error } = await supabase.from("guestbook_messages").insert({
      author: author.trim(),
      content: content.trim(),
      color_index: colorIndex,
    });
    
    setSubmitting(false);
    if (error) {
      toast.error("전송 실패");
      return;
    }
    setAuthor("");
    setContent("");
    setIsFormOpen(false);
    toast.success("메시지가 전달되었습니다");
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  return (
    <section className="bg-[#f7f1e8] px-3 py-20 text-center">
      <section className="px-6 max-w-[340px] mx-auto">
        <div className="text-center">
          <h2
            className="text-2xl text-stone-800"
            style={{ fontFamily: '"Noto Serif KR", serif' }}
          >
            Message
          </h2>

          <p className="mt-4 leading-relaxed text-sm text-primary/60">
            황이와 현경이에게
          </p>
        </div>

        {/* 메시지 리스트 (최대 3개 노출) */}
        {messages.length > 0 && (
          <div className="mt-8 space-y-3.5 text-left">
            {messages.slice(0, 3).map((m) => {
              const bgStyle =
                CARD_BG_STYLES[m.color_index ?? 0] || CARD_BG_STYLES[0];
              return (
                <div
                  key={m.id}
                  className={`relative rounded-2xl p-5 shadow-sm border ${bgStyle}`}
                >
                  <p className="text-[14.5px] leading-relaxed text-stone-800 whitespace-pre-wrap break-words">
                    {m.content}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-stone-400 font-light pt-3 border-t border-dashed border-stone-300/80">
                    <span>
                      <span className="text-stone-400 mr-1">From</span>
                      <span className="text-stone-700 font-medium">
                        {m.author}
                      </span>
                    </span>
                    <span className="text-stone-400">
                      {formatDate(m.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 메시지가 3개 초과일 때 전체보기 버튼 노출 */}
        {messages.length > 3 && (
          <div className="mt-3 text-right">
            <button
              onClick={() => setIsAllModalOpen(true)}
              className="text-xs text-stone-500 underline underline-offset-4 hover:text-stone-800"
            >
              전체 메시지 보기 ({messages.length}개)
            </button>
          </div>
        )}

        {/* 메시지 작성 토글 버튼 */}
        <div className="mt-6">
          <button
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="w-full rounded-2xl bg-stone-800 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-stone-700 active:scale-[0.98] transition-all"
          >
            {isFormOpen ? "닫기" : "메시지 작성하기"}
          </button>
        </div>

        {/* 입력 폼 영역 */}
        {isFormOpen && (
          <div className="mt-3.5 rounded-2xl bg-white/80 p-4 border border-stone-200/70 shadow-sm backdrop-blur-sm space-y-3 transition-all text-left">
            <div>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="성함을 입력해주세요"
                className="w-full rounded-xl border border-stone-200/80 bg-white px-3.5 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400/50 transition"
              />
            </div>
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="축하의 마음을 전달해주세요 💌"
                rows={3}
                className="w-full rounded-xl border border-stone-200/80 bg-white px-3.5 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 resize-none focus:outline-none focus:ring-2 focus:ring-stone-400/50 transition"
              />
            </div>
            <button
              onClick={submit}
              disabled={submitting}
              className="w-full rounded-xl bg-stone-700 py-3 text-sm font-medium text-white hover:bg-stone-800 active:scale-[0.98] transition-all disabled:opacity-50 shadow-sm mt-1"
            >
              {submitting ? "전송 중…" : "보내기"}
            </button>
          </div>
        )}
      </section>

      {/* 전체 메시지 보기 모달 팝업 */}
      {isAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[360px] max-h-[80vh] flex flex-col rounded-3xl bg-[#f7f1e8] p-6 shadow-2xl text-left">
            <div className="flex justify-between items-center pb-4 border-b border-stone-300">
              <h3 className="font-serif text-lg text-stone-800">
                전체 메시지 ({messages.length})
              </h3>
              <button
                onClick={() => setIsAllModalOpen(false)}
                className="text-stone-500 hover:text-stone-800 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 my-4 pr-1">
              {messages.map((m) => {
                const bgStyle =
                  CARD_BG_STYLES[m.color_index ?? 0] || CARD_BG_STYLES[0];
                return (
                  <div
                    key={m.id}
                    className={`rounded-2xl p-4 shadow-sm border ${bgStyle}`}
                  >
                    <p className="text-sm leading-relaxed text-stone-800 whitespace-pre-wrap break-words">
                      {m.content}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-stone-400 font-light pt-2 border-t border-dashed border-stone-300">
                      <span>
                        <span className="mr-1">From</span>
                        <span className="text-stone-700 font-medium">
                          {m.author}
                        </span>
                      </span>
                      <span>{formatDate(m.created_at)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsAllModalOpen(false)}
              className="w-full py-3 bg-stone-800 text-white rounded-xl text-sm font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </section>
  );
}