import { useEffect, useState } from "react";
import intro from "@/assets/intro3.gif";

type IntroProps = {
  onFinish: () => void;
};

export function Intro({ onFinish }: IntroProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 2.5초 후 페이드 시작
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // 페이드 완료 후 메인 화면
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center bg-white">
      <div className="relative w-full max-w-[480px] h-full overflow-hidden">
        <img
          src={intro}
          alt="Wedding Intro"
          className="w-full h-full object-cover animate-intro"
        />
      </div>
    </div>
  );
}