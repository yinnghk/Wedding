import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Message = {
  id: string;
  author: string;
  content: string;
  color_index: number;
  created_at: string;
};

const COLORS = [
  "#efe7f7",
  "#e5daf3",
  "#f3ecf8",
  "#e9e2f0",
  "#f0e6f6",
  "#e2d7ee",
];

export function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    const { error } = await supabase.from("guestbook_messages").insert({
      author: author.trim(),
      content: content.trim(),
      color_index: Math.floor(Math.random() * COLORS.length),
    });
    setSubmitting(false);
    if (error) {
      toast.error("전송 실패");
      return;
    }
    setAuthor("");
    setContent("");
    toast.success("메시지가 전달되었습니다");
  };

  // Split for masonry (2 columns)
  const cols: Message[][] = [[], []];
  messages.forEach((m, i) => cols[i % 2].push(m));

  return (
    <section className="px-6">
      <div className="text-center">
        <h2 
          className="text-2xl"
          style={{ fontFamily: '"Noto Serif KR", serif' }}>
          축하 메시지</h2>
      </div>

      <div className="mt-6 p-4 space-y-3">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="이름"
          className="w-full rounded-full border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="축하 메시지를 남겨주세요💌"
          rows={3}
          className="w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={submit}
          disabled={submitting}
          className="w-full rounded-full bg-primary py-2.5 font-medium text-primary-foreground transition active:scale-95 disabled:opacity-50"
        >
          {submitting ? "전송 중…" : "메시지 남기기"}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3">
            {col.map((m, i) => {
              const rot = (m.id.charCodeAt(0) % 6) - 3;
              return (
                <div
                  key={m.id}
                  className="rounded-xl p-4 border border-primary/10"
                  style={{
                    background: COLORS[m.color_index % COLORS.length],
                    transform: `rotate(${rot}deg)`,
                  }}
                >
                  <p className="text-sm whitespace-pre-wrap break-words text-foreground/85">
                    {m.content}
                  </p>
                  <p className="mt-2 text-[11px] font-serif text-foreground/70">— {m.author}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
