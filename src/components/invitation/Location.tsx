import { MapPin, Car, Train, TrainFrontTunnelIcon, Bus } from "lucide-react";

const ADDRESS = "서울특별시 용산구 이태원로 29";
const KAKAO = `https://map.kakao.com/link/search/${encodeURIComponent(ADDRESS)}`;
const NAVER = `https://map.naver.com/v5/search/${encodeURIComponent(ADDRESS)}`;

export function Location() {
  return (
    <section className="px-6">
      <div className="text-center">
        <h2 
          className="text-2xl"
          style={{ fontFamily: '"Noto Serif KR", serif' }}>
          오시는 길</h2>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <iframe
          title="지도"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
          className="w-full h-56"
          loading="lazy"
        />
      </div>

      <div className="mt-4 p-5 text-center">
        <div className="flex items-center justify-center gap-2 text-primary">
          <MapPin size={16} />
          <p className="font-serif">{ADDRESS}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <a
            href={NAVER}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 rounded-full bg-card border border-border text-sm active:scale-95 transition"
          >
            네이버 지도
          </a>
          <a
            href={KAKAO}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 rounded-full bg-card border border-border text-sm active:scale-95 transition"
          >
            카카오맵
          </a>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-2xl p-4 flex gap-3">
          <Car className="text-primary shrink-0" size={20} />
          <div className="text-sm">
            <p className="font-medium">주차장</p>
            <p className="text-foreground/70 mt-1 leading-7">
              전쟁기념관 지상·지하 주차장 이용 가능 (2시간 무료)
            </p>
          </div>
        </div>
        <div className="rounded-2xl p-4 flex gap-3">
          <Train className="text-primary shrink-0" size={20} />
          <div className="text-sm">
            <p className="font-medium">지하철</p>
            <p className="text-foreground/70 mt-1 leading-7">
              6호선 삼각지역 12번 출구 (도보 5분)
              <br />
              4호선 삼각지역 1번 출구 (도보 9분)
              <br />
              1호선 남영역 1번 출구 (도보 14분)
            </p>
          </div>
        </div>
        <div className="rounded-2xl p-4 flex gap-3">
          <Bus className="text-primary shrink-0" size={20} />
          <div className="text-sm">
            <p className="font-medium">버스</p>
            <p className="text-foreground/70 mt-1 leading-7">
              ① 전쟁기념관 하차
              <br />
              - 110A, 110B, 421, 740, N72. N75, 용산 03
              <br />
              ② 삼각지역 하차
              <br />
              - 421, 100, 150, 151, 152, 500, 501, 502, 504, 506, 507, 605, 742, 750A, 750B, 752
            </p>
          </div>
        </div>        
      </div>
    </section>
  );
}
