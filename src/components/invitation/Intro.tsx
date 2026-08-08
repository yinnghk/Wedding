import { useEffect, useState, useRef } from "react";

interface IntroProps {
  onFinish: () => void;
}

// 1. 상수는 컴포넌트 외부로 이동
const TEXT = "we're getting married ♥";

export function Intro({ onFinish }: IntroProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isFading, setIsFading] = useState(false);

  // 2. onFinish 함수 참조를 ref로 관리하여 useEffect 재실행 방지
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const characters = Array.from(TEXT); // 이모지/특수문자 자르기 안전화
    let index = 0;
    let fadeTimer: NodeJS.Timeout;
    let finishTimer: NodeJS.Timeout;

    const typingInterval = setInterval(() => {
      if (index < characters.length) {
        setDisplayedText(characters.slice(0, index + 1).join(""));
        index++;
      } else {
        clearInterval(typingInterval);

        // 타이핑 완료 후 0.4초 뒤 서서히 사라짐 시작
        fadeTimer = setTimeout(() => {
          setIsFading(true);

          // 1초 동안 페이드아웃 후 완전히 제거
          finishTimer = setTimeout(() => {
            onFinishRef.current();
          }, 2000);
        }, 1000);
      }
    }, 70);

    // 3. 언마운트 시 모든 타이머 정돈 (클린업)
    return () => {
      clearInterval(typingInterval);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-2000 ease-in-out pointer-events-none ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="px-6 text-center">
        <h1 className="font-serif text-2xl tracking-widest text-black sm:text-3xl">
          {displayedText}
          {/* 커서 깜빡임 애니메이션 (타이핑 중일 때만 표시) */}
          {displayedText.length < TEXT.length && (
            <span className="inline-block w-[2px] h-5 ml-1 bg-black animate-pulse" />
          )}
        </h1>
      </div>
    </div>
  );
}