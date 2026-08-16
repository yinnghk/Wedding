import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import 한복 from "@/assets/한복2.jpg";

export function Hxunhwang() {
  const [showQA, setShowQA] = useState(false);

  const qaList = [
    {
      q: "어떻게 만났나요?",
      a: "저희는 같은 대학교 친구의 소개로 만났습니다!\n뒤늦은 CC가 되며 서로를 운명이라고 믿고\n늦게 만난 시간만큼 더 많이 사랑하려고 합니다 🤍",
    },
    {
      q: "서로 잘 맞나요?",
      a: "서로의 텐션은 조금 다르지만\n이성적이고 꼼꼼한 면과 삶에 대한 가치관이 매우 유사합니다",
    },
    {
      q: "서로의 어떤 점에 끌렸나요?",
      a: "황 : 당당한 커리어우먼 같은 모습이 멋지다고 생각했습니다.\n 현경 : 역사에 대해 질문하면 술술 설명해주는 게 매력적이었습니다.",
    },
    {
      q: "결혼을 결심한 이유는 무엇인가요?",
      a: "황 : 삶을 대하는 똑부러지는 태도에 의지하며 살 수 있을 것 같았습니다.\n 현경 : 이 사람한테는 평생 어리광 부리며 살아도 될 것 같았습니다✨",
    },
    {
      q: "결혼 후 이것만큼은 지켜주겠다 하는 것은?",
      a: "황 : 한 달에 한 번 회와 곱창을 꼭 사주겠습니다.\n 현경 : 매일 심심하지 않은 삶을 살게 해주겠습니다.",
    },
  ];

  return (
    <section className="bg-[#faf6f1] py-20 text-center">
      {/* invitation-container 전체 폭 지정 (max-w-md 등으로 조절 가능) */}
      <div className="invitation-container mx-auto max-w-md px-4">
        <div className="text-center">
          <h2
            className="text-2xl text-stone-800"
            style={{ fontFamily: '"Noto Serif KR", serif' }}
          >
            Q & A
          </h2>
        </div>

        <p className="mt-4 leading-relaxed text-sm text-primary/80">
          신랑 신부를 소개합니다
        </p>

        {/* --- 1. 통합 프로필 카드 --- */}
        <div className="mt-7 rounded-2xl bg-white/60 p-5 shadow-sm border border-stone-200/50">
          {/* 상단: 한 장의 꽉 차는 이미지 영역 */}
          <div className="w-full aspect-square sm:aspect-[4/3] overflow-hidden rounded-xl ring-2 ring-stone-100 shadow-inner">
            <img
              src={한복}
              alt="한복"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* 하단: 2단 텍스트 설명 영역 */}
          <div className="mt-3 grid grid-cols-2 gap-4 divide-x divide-stone-200/60">
            {/* 신랑 정보 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-800 text-base">이황</span>
              </div>
              <span className="text-[10px] mt-2 px-3 py-0.5 rounded-full bg-amber-100/80 text-amber-800 font-medium tracking-wide">
                ISTJ
              </span>
              <div className="mt-3 text-xs leading-relaxed text-stone-600 space-y-1">
                <p>자유롭고 싶은 여행가</p>
                <p>안정적인 편안함</p>
                <p>고기 좋아 사람</p>
              </div>
            </div>

            {/* 신부 정보 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-800 text-base">남궁현경</span>
              </div>
              <span className="text-[10px] mt-2 px-3 py-0.5 rounded-full bg-rose-100/80 text-rose-800 font-medium tracking-wide">
                ENTJ
              </span>
              <div className="mt-3 text-xs leading-relaxed text-stone-600 space-y-1">
                <p>흥이 넘치는 야망가</p>
                <p>톡톡 튀는 텐션</p>
                <p>해물 좋아 사람</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. 인터뷰 보기 / 접기 버튼 카드 --- */}
        <div className="mt-4 font-sans">
          <div className="rounded-2xl border border-stone-200/50 bg-white/60 p-5 shadow-sm transition-all">
            {/* 인터뷰 토글 버튼 */}
            <button
              onClick={() => setShowQA(!showQA)}
              className="flex w-full items-center justify-between"
            >
              <span className="text-sm font-medium text-stone-800">
                우리들의 인터뷰 {showQA ? "접기" : "보기"}
              </span>
              <ChevronDown
                size={16}
                className={`text-stone-500 transition-transform duration-300 ${
                  showQA ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Q&A 목록 */}
            {showQA && (
              <div className="mt-3.5 text-left transition-all duration-300">
                {qaList.map((item, idx) => (
                  <div
                    key={idx}
                    className="pt-3 pb-3 border-t border-stone-200/60 space-y-2"
                  >
                    <p className="text-xs font-semibold text-stone-800 tracking-wide">
                      Q. {item.q}
                    </p>
                    <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line font-normal">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}