import { Link2 } from "lucide-react";
import { toast } from "sonner";
import intro from "@/assets/intro3.gif";

export function Footer() {
  const copy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 복사되었습니다.");
    }
  };

  return (
    <section className="bg-[#ffffff] px-6 py-12 text-center">
      <footer className="px-6 pb-16 pt-4 text-center">
        <h2 
            className="text-2xl"
            style={{ fontFamily: '"Noto Serif KR", serif' }}>
          청첩장 공유하기</h2>

        <div className="mt-5 flex justify-center">
          <button
            onClick={copy}
            className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary py-3 text-primary-foreground font-medium transition active:scale-95"
          >
            <Link2 size={16} />
            링크 복사
          </button>
        </div>

        <div className="relative w-full max-w-[480px] h-full overflow-hidden">
          <img
            src={intro}
            alt="Wedding Intro"
            className="w-full h-full object-cover animate-intro"
          />
        </div>

        <p className="mt-10 font-serif text-sm text-primary/70">
          소중한 날 귀한 걸음으로 축하해주셔서 감사합니다.
        </p>
      </footer>
    </section>
  );
}