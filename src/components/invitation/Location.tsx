import { MapPin, Car, Train, Bus, Navigation } from "lucide-react";

const ADDRESS = "서울특별시 용산구 이태원로 29";
const KAKAO = `https://map.kakao.com/link/search/${encodeURIComponent(ADDRESS)}`;
const NAVER = `https://map.naver.com/v5/search/${encodeURIComponent(ADDRESS)}`;

export function Location() {
  return (
    <section className="bg-[#ffffff] py-20 text-center">
      <div className="invitation-container">
        <div className="text-center">
          <h2
            className="text-2xl text-stone-800"
            style={{ fontFamily: '"Noto Serif KR", serif' }}
          >
            Location
          </h2>
        </div>

          <p className="mt-4 leading-relaxed text-sm text-primary/60">
            로얄파크컨벤션
          </p>
          <p className="leading-relaxed text-xs text-primary/60">
            서울특별시 용산구 이태원로 29(전쟁기념관 내 위치)
          </p>


        {/* 지도 영역 */}
        <div className="mt-4 relative overflow-hidden rounded-2xl border border-border/60 shadow-xs">
          <iframe
            title="지도"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
            className="h-60 w-full border-0 grayscale-[0.2] transition-all duration-300 hover:grayscale-0"
            loading="lazy"
          />
        </div>

        {/* 주소 및 내비게이션 버튼 */}
        <div className="mt-5 flex gap-2 font-sans">
          <a
            href={NAVER}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-stone-200/70 bg-white/70 py-2.5 text-xs font-medium text-stone-800 shadow-xs backdrop-blur-sm transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            <Navigation className="size-3.5 text-[#03C75A]" />
            네이버 지도
          </a>
          <a
            href={KAKAO}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-stone-200/70 bg-white/70 py-2.5 text-xs font-medium text-stone-800 shadow-xs backdrop-blur-sm transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            <Navigation className="size-3.5 text-[#FEE500] fill-[#3C1E1E]" />
            카카오맵
          </a>
        </div>

        {/* 교통 수단 안내 */}
        <div className="mt-4 text-left font-sans">
          <div className="rounded-2xl border border-stone-200/70 bg-white/70 p-4 shadow-xs backdrop-blur-sm space-y-3.5">
            {/* 주차 */}
            <div>
              <div className="flex items-center gap-1.5">
                <div className="flex size-5 shrink-0 items-center justify-center text-stone-700">
                  <Car className="size-3.5" />
                </div>
                <p className="font-semibold text-sm text-stone-800">주차 안내</p>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
                전쟁기념관 지상·지하 주차장 이용 가능 (2시간 무료)
              </p>
            </div>

            {/* 지하철 */}
            <div className="pt-3.5 border-t border-stone-200/60">
              <div className="flex items-center gap-1.5">
                <div className="flex size-5 shrink-0 items-center justify-center text-stone-700">
                  <Train className="size-3.5" />
                </div>
                <p className="font-semibold text-sm text-stone-800">지하철</p>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-stone-500">
                <li className="flex items-center gap-2">
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[#CD4C55] text-[10px] font-bold text-white shadow-xs">6</span>
                  <span><strong className="font-medium text-stone-800">삼각지역 12번 출구</strong> (도보 5분)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[#00A2D1] text-[10px] font-bold text-white shadow-xs">4</span>
                  <span><strong className="font-medium text-stone-800">삼각지역 1번 출구</strong> (도보 9분)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[#002D84] text-[10px] font-bold text-white shadow-xs">1</span>
                  <span><strong className="font-medium text-stone-800">남영역 1번 출구</strong> (도보 14분)</span>
                </li>
              </ul>
            </div>

            {/* 버스 */}
            <div className="pt-3.5 border-t border-stone-200/60">
              <div className="flex items-center gap-1.5">
                <div className="flex size-5 shrink-0 items-center justify-center text-stone-700">
                  <Bus className="size-3.5" />
                </div>
                <p className="font-semibold text-sm text-stone-800">버스</p>
              </div>
              <div className="mt-2 space-y-2 text-xs text-stone-500">
                <div>
                  <p className="font-medium text-stone-700">전쟁기념관 하차</p>
                  <p className="mt-0.5 leading-relaxed text-stone-500/90">110A, 110B, 421, 740, N72, N75, 용산03</p>
                </div>
                <div>
                  <p className="font-medium text-stone-700">삼각지역 하차</p>
                  <p className="mt-0.5 leading-relaxed text-stone-500/90">
                    421, 100, 150, 151, 152, 500, 501, 502, 504, 506, 507, 605, 742, 750A, 750B, 752
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}