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

const INITIAL = 6; // 3열 x 2줄

export function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  const visible = expanded ? photos : photos.slice(0, INITIAL);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const [touchX, setTouchX] = useState<number | null>(null);

  return (
    <section className="bg-[#f7f1e8] px-6 py-12 text-center">
      <div className="px-6 text-center">
        <h2 
          className="text-2xl"
          style={{ fontFamily: '"Noto Serif KR", serif' }}>
          웨딩 사진</h2>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-1.5 px-6">
        {visible.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="aspect-square overflow-hidden rounded-md bg-muted active:scale-[0.98] transition"
          >
            <img
              src={src}
              alt={`갤러리 사진 ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {photos.length > INITIAL && (
        <div className="mt-5 px-6 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-7 py-2.5 rounded-full border border-primary/20 bg-card text-sm text-primary font-medium active:scale-95 transition"
          >
            {expanded ? "접기" : "더보기"}
          </button>
        </div>
      )}

      {index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (dx > 50) prev();
            else if (dx < -50) next();
            setTouchX(null);
          }}
        >
          <button
            onClick={close}
            aria-label="닫기"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card/15 text-primary-foreground"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="이전 사진"
            className="absolute left-2 grid h-10 w-10 place-items-center rounded-full bg-card/15 text-primary-foreground"
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={photos[index]}
            alt={`갤러리 사진 ${index + 1}`}
            loading="lazy"
            className="max-h-[80vh] max-w-[88vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="다음 사진"
            className="absolute right-2 grid h-10 w-10 place-items-center rounded-full bg-card/15 text-primary-foreground"
          >
            <ChevronRight size={22} />
          </button>

          <p className="absolute bottom-6 text-xs tracking-widest text-primary-foreground/70">
            {index + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  );
}
