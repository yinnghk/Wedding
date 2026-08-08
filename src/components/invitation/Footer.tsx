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
    <section className="bg-[#ffffff] text-center">
      <footer className="px-6 pb-10 text-center">

        <div className="relative w-full max-w-[480px] h-full overflow-hidden">
          <img
            src={intro}
            alt="Wedding Intro"
            className="w-full h-full object-cover animate-intro"
          />
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={copy}
            className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#c7a37e] py-2 text-primary-foreground font-medium transition active:scale-95"
          >
            청첩장 전달하기
          </button>
        </div>


        <p className="mt-5 font-serif text-sm text-primary/70">
          소중한 날 귀한 걸음으로 축하해주셔서 감사합니다.
        </p>

        <p className="mt-5 font-serif text-xs text-primary/30">
          made by hxunhwang
        </p>

      </footer>
    </section>
  );
}