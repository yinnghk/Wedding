import RingAsset from "@/assets/wuli-9.webp";

export function Ring() {
  return (
    <section className="relative h-[65svh] w-full overflow-hidden">
      <img
        src={RingAsset}
        alt="영원한 사랑"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
    )
}