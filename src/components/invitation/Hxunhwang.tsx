import React, { useState } from "react";

import hwang from "@/assets/이황.jpg";
import hxun from "@/assets/남궁현경.jpg";

export function Hxunhwang() {
  const [showQA, setShowQA] = useState(false);

  const qaList = [
    {
      q: "어떻게 만났나요?",
      a: "저희는 같은 대학교 친구의 소개로 만났습니다!\n뒤늦은 CC가 되며 서로를 운명이라고 믿고\n아까운 시간만큼 더 많이 사랑하려고 합니다 🤍",
    },
    {
      q: "서로 잘 맞나요?",
      a: "서로의 텐션은 조금 다르지만\n이성적이고 꼼꼼한 면이 비슷하고\n삶에 대한 가치관이 매우 유사합니다 🖤",
    },
    {
      q: "서로의 어떤 점에 끌렸나요?",
      a: "황 : 당당한 커리어우먼 같은 모습이 멋지다고 생각했습니다.\n\n현경 : 제가 문외한인 역사를 좋아하는 게 매력적이었습니다.",
    },
    {
      q: "결혼을 결심한 이유는 무엇인가요?",
      a: "황 : 삶을 대하는 똑부러지는 태도에 의지하며 살 수 있을 것 같았습니다.\n\n현경 : 이 사람한테는 평생 어리광 부리며 살아도 될 것 같았습니다! ✨",
    },
  ];

  return (
    <section className="bg-[#faf6f1] px-4 py-16 text-center">
      <div className="mx-auto max-w-[360px]">
        {/* 타이틀 영역 */}
        <p className="text-xs tracking-[0.2em] text-stone-400 uppercase font-light">
          Profile & Story
        </p>
        <h2
          className="mt-1 text-2xl font-serif text-stone-800"
          style={{ fontFamily: '"Gowun Batang", serif' }}
        >
          Interview
        </h2>

        {/* --- 신랑 / 신부 프로필 카드 --- */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          {/* 신랑 프로필 */}
          <div className="flex flex-col items-center rounded-2xl bg-white/60 p-4 shadow-sm border border-stone-200/50">
            <div className="w-24 h-24 overflow-hidden rounded-full ring-4 ring-stone-100 shadow-inner">
              <img
                src={hwang}
                alt="신랑 이황"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="font-bold text-stone-800 text-base">이황</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-800 font-medium tracking-wide">
                ISTJ
              </span>
            </div>
            <div className="mt-2 text-xs leading-relaxed text-stone-600 space-y-1">
              <p>자유롭고 싶은 여행가</p>
              <p>조용한 다정함</p>
              <p className="font-medium text-stone-700">🥩 고기 좋아 사람</p>
            </div>
          </div>

          {/* 신부 프로필 */}
          <div className="flex flex-col items-center rounded-2xl bg-white/60 p-4 shadow-sm border border-stone-200/50">
            <div className="w-24 h-24 overflow-hidden rounded-full ring-4 ring-stone-100 shadow-inner">
              <img
                src={hxun}
                alt="신부 남궁현경"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="font-bold text-stone-800 text-base">남궁현경</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100/80 text-rose-800 font-medium tracking-wide">
                ENTJ
              </span>
            </div>
            <div className="mt-2 text-xs leading-relaxed text-stone-600 space-y-1">
              <p>흥이 넘치는 야망가</p>
              <p>톡톡 튀는 텐션</p>
              <p className="font-medium text-stone-700">🦀 해물 좋아 사람</p>
            </div>
          </div>
        </div>

        {/* --- 인터뷰 보기 / 접기 버튼 --- */}
        <div className="mt-10">
          <button
            onClick={() => setShowQA(!showQA)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 bg-white text-xs font-medium text-stone-700 shadow-sm active:scale-95 transition hover:bg-stone-50"
          >
            <span>💌 {showQA ? "인터뷰 접기" : "우리들의 인터뷰 보기"}</span>
            <span
              className={`transition-transform duration-300 text-[10px] ${
                showQA ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* --- Q&A 목록 --- */}
          {showQA && (
            <div className="mt-8 space-y-4 text-left transition-all duration-500">
              {qaList.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/80 p-5 shadow-sm border border-stone-100"
                >
                  <p className="text-xs font-bold text-amber-900/80 tracking-wide">
                    Q. {item.q}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 whitespace-pre-line font-light">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}