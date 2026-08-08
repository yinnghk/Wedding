import heroAsset from "@/assets/wuli-23.webp";

export function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <img
        src={heroAsset}
        alt="이황과 남궁현경"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />


      <div className="absolute inset-x-0 bottom-24 flex flex-col items-center text-white px-6 animate-fade-up">
        <p className="mt-4 text-sm opacity-90">2026년 12월 12일 토요일 오후 4시
          </p>
        <p className="mt-1 text-sm opacity-90">로얄파크컨벤션 1F 파크홀
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center text-white/90 animate-bounce-slow">
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
          <path d="M9 2v18m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}
