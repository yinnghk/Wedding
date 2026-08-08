import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import img1 from "@/assets/wuli-23.webp";
import img2 from "@/assets/wuli-46.webp";
import img3 from "@/assets/wuli-76.webp";
import img4 from "@/assets/wuli-114.webp";
import img5 from "@/assets/wuli-복사2.webp";
import img6 from "@/assets/wuli-151.webp";
import img7 from "@/assets/wuli-166.webp";
import img8 from "@/assets/wuli-167.webp";
import img9 from "@/assets/wuli-179.webp";
import img10 from "@/assets/wuli-190.webp";
import img11 from "@/assets/wuli-208.webp";
import img12 from "@/assets/CAN_4778.webp";
import img13 from "@/assets/CAN_4811.webp";
import img14 from "@/assets/CAN_4547.webp";
import img15 from "@/assets/CAN_4584.webp";
import img16 from "@/assets/CAN_4589.webp";
import img17 from "@/assets/CAN_4680.webp";

const photos: string[] = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % photos.length);
  }, []);

  const modalPrev = useCallback(() => {
    setModalIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
  }, []);

  const modalNext = useCallback(() => {
    setModalIndex((i) => (i === null ? i : (i + 1) % photos.length));
  }, []);

  // 풀스크린 모달 키보드 조작
  useEffect(() => {
    if (modalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      if (e.key === "ArrowLeft") modalPrev();
      if (e.key === "ArrowRight") modalNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalIndex, modalPrev, modalNext]);

  return (
    <section className="bg-[#f7f1e8] px-6 py-20 text-center">
      <section className="px-6">
        <div className="text-center">
          <h2
            className="text-2xl"
            style={{ fontFamily: '"Noto Serif KR", serif' }}
          >
            Gallery
          </h2>
        </div>
      </section>

      {/* 메인 캐러셀 슬라이더 */}
      <div className="mt-7 relative w-full">
        {/* 좌우 이동 버튼 */}
        <button
          onClick={prev}
          aria-label="이전 사진"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-background/65 shadow-md text-foreground transition active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="다음 사진"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-background/65 shadow-md text-foreground transition active:scale-90"
        >
          <ChevronRight size={20} />
        </button>

        {/* 아치형 캐러셀 레일 */}
        <div
          className="relative w-full h-[450px] flex items-center justify-center"
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (dx > 40) prev();
            else if (dx < -40) next();
            setTouchX(null);
          }}
        >
          {photos.map((src, i) => {
            // 현재 인덱스 기준으로의 상대적 위치 계산
            let diff = i - currentIndex;
            if (diff < -Math.floor(photos.length / 2)) diff += photos.length;
            if (diff > Math.floor(photos.length / 2)) diff -= photos.length;

            const isCurrent = diff === 0;

            return (
              <div
                key={i}
                onClick={() => {
                  if (isCurrent) {
                    setModalIndex(i); // 메인 카드 클릭 시 확대 모달
                  } else {
                    setCurrentIndex(i); // 양옆 카드 클릭 시 해당 카드로 이동
                  }
                }}
                className={`absolute transition-all duration-500 ease-out cursor-pointer select-none overflow-hidden rounded-t-full shadow-lg ${
                  isCurrent ? "z-10" : "z-0 opacity-60 scale-90"
                }`}
                style={{
                  width: "260px",
                  height: "380px",
                  transform: `translateX(${diff * 220}px) scale(${isCurrent ? 1 : 0.85})`,
                }}
              >
                <img
                  src={src}
                  alt={`웨딩 사진 ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        <div>
          <span className="text-xs">
            클릭하면 전체 사진을 볼 수 있어요
          </span>
        </div>

        {/* 하단 인디케이터 / 카운터 */}
        <div className="mt-3 text-xs tracking-widest text-foreground/60 font-medium">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* 클릭 시 띄워주는 풀스크린 모달 */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-hidden"
          onClick={() => setModalIndex(null)}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (dx > 50) modalPrev();
            else if (dx < -50) modalNext();
            setTouchX(null);
          }}
        >
          <button
            onClick={() => setModalIndex(null)}
            aria-label="닫기"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-card/20 text-white"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              modalPrev();
            }}
            aria-label="이전 사진"
            className="absolute left-2 z-20 grid h-10 w-10 place-items-center rounded-full bg-card/20 text-white"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="w-full h-full flex items-center justify-center">
            <div
              className="flex w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${modalIndex * 100}%)` }}
            >
              {photos.map((src, i) => (
                <div
                  key={i}
                  className="min-w-full h-full flex items-center justify-center px-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={src}
                    alt={`갤러리 확대 사진 ${i + 1}`}
                    className="max-h-[85vh] max-w-[90vw] object-contain select-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              modalNext();
            }}
            aria-label="다음 사진"
            className="absolute right-2 z-20 grid h-10 w-10 place-items-center rounded-full bg-card/20 text-white"
          >
            <ChevronRight size={22} />
          </button>

          <p className="absolute bottom-6 z-20 text-xs tracking-widest text-white/70">
            {modalIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  );
}