import React, { useState } from "react";

import hwang from "@/assets/이황.jpg";
import hxun from "@/assets/남궁현경.jpg";

export function Hxunhwang() {
  const [showQA, setShowQA] = useState(false);

  return (
    <section className="bg-[#faf6f1] px-2 py-12 text-center">
      <section className="px-6 text-center">
        <h2 
            className="text-2xl"
            style={{ fontFamily: '"Noto Serif KR", serif' }}>
          Interview</h2>

        <div className="mt-8 grid grid-cols-2 gap-10 px-2">

          {/* --- 신랑 카드 --- */}
          <div className="flex flex-col items-center">
            {/* 네모칸 영역 (사진/프로필용) */}
            <div className="w-full aspect-square overflow-hidden rounded-md bg-muted active:scale-[0.98] transition cursor-pointer">
              <img
                src={hwang}
                alt="신랑 이황"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 font-sans-serif text-md leading-relaxed text-foreground/85 whitespace-pre-line">
              <span className="font-bold">이황</span>
            </p>
            <p className="font-sans-serif text-sm leading-relaxed text-foreground/85 whitespace-pre-line">
              {`ISTJ
              자유롭고 싶은 여행가
              조용한 다정함
              고기 좋아 사람`}
            </p>
          </div>

          {/* --- 신부 카드 --- */}
          <div className="flex flex-col items-center">        
            {/* 네모칸 영역 (사진/프로필용) */}
            <div className="w-full aspect-square overflow-hidden rounded-md bg-muted active:scale-[0.98] transition cursor-pointer">
              <img
                src={hxun}
                alt="신랑 남궁현경"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 font-sans-serif text-md leading-relaxed text-foreground/85 whitespace-pre-line">
              <span className="font-bold">남궁현경</span>
            </p>
            <p className="font-sans-serif text-sm leading-relaxed text-foreground/85 whitespace-pre-line">
              {`ENTJ
              흥이 넘치는 야망가
              톡톡 튀는 텐션
              해물 좋아 사람`}
            </p>
          </div>       
        </div>

        <div className="mt-10 px-4 text-center">
          <button
            onClick={() => setShowQA(!showQA)}
            className="px-7 py-2.5 rounded-full border border-primary/20 bg-card text-sm text-primary font-medium active:scale-95 transition"
          >
            {showQA ? "💌인터뷰 접기" : "💌인터뷰 보기"}
          </button>

          {showQA && (
            <div className="mt-8 text-center">
              <p className="font-sans-serif text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                <span className="font-bold">Q. 어떻게 만났나요?</span>
                {`
        저희는 같은 대학교 친구의 소개로 만났습니다!
        뒤늦은 CC가 되며 서로를 운명이라고 믿고
        아까운 시간만큼 더 많이 사랑하려고 합니다`}
              </p>

              <p className="mt-6 font-sans-serif text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                <span className="font-bold">Q. 서로 잘 맞나요?</span>
                {`
        서로의 텐션은 조금 다르지만
        이성적이고 꼼꼼한 면이 비슷하고
        삶에 대한 가치관이 매우 유사합니다🖤`}
              </p>

              <p className="mt-6 font-sans-serif text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                <span className="font-bold">Q. 서로의 어떤 점에 끌렸나요?</span>
                {`
        황 : 당당한 커리어우먼 같은 모습이
        멋지다고 생각했습니다

        현경 : 제가 문외한인 역사를 좋아하는 게
        매력적이었습니다`}
              </p>

              <p className="mt-6 font-sans-serif text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                <span className="font-bold">Q. 결혼을 결심한 이유는 무언가요?</span>
                {`
        황 : 삶을 대하는 똑부러지는 태도에
        의지하며 살 수 있을 것 같았습니다

        현경 : 이 사람한테는 평생
        어리광 부리며 살아도 될 것 같았습니다!`}
              </p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
