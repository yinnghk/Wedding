import { useState } from "react";

import { FadeIn } from "@/components/invitation/Fadein";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Hero } from "@/components/invitation/Hero";
import { Invitation } from "@/components/invitation/Invitation";
import { Gallery } from "@/components/invitation/Gallery";
import { Countdown } from "@/components/invitation/Countdown";
import { Location } from "@/components/invitation/Location";
import { Accounts } from "@/components/invitation/Accounts";
import { Rsvp } from "@/components/invitation/Rsvp";
import { Guestbook } from "@/components/invitation/Guestbook";
import { Footer } from "@/components/invitation/Footer";
import { StarDivider } from "@/components/invitation/Divider";
import { Hxunhwang } from "@/components/invitation/Hxunhwang";
import { Bgm } from "@/components/invitation/Bgm";
import { Intro } from "@/components/invitation/Intro";
import { Ring } from "@/components/invitation/Ring";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "이황 ♥ 남궁현경 결혼합니다💍" },
      {
        name: "description",
        content:
          "2026.12.12 토요일 오후 4시 로얄파크컨벤션 1F 파크홀",
      },
      { property: "og:title", content: "이황 ♥ 남궁현경 결혼합니다💍" },
      {
        property: "og:description",
        content: "2026.12.12 토요일 오후 4시 로얄파크컨벤션 1F 파크홀",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [showIntro, setShowIntro] = useState(true);
  const [startBgm, setStartBgm] = useState(false);

  return (
    <>
      {/* 인트로가 표시되는 동안 배경 메인 화면이 뒤에 배치되어 비치게 됩니다 */}
      {showIntro && (
        <Intro
          onFinish={() => {
            setShowIntro(false);
            setStartBgm(true); // 인트로 완료 시 BGM 재생
          }}
        />
      )}

      <div className="min-h-screen w-full page-bg">
        <Toaster position="top-center" richColors />

        {/* play 프로퍼티로 재생 신호 전달 */}
        <Bgm play={startBgm} />

        <main className="mx-auto w-full max-w-[390px] overflow-hidden bg-white">
          <Hero />

          <FadeIn><Invitation /></FadeIn>
          <FadeIn><Ring /></FadeIn>
          <FadeIn><Countdown /></FadeIn>
          <FadeIn><Hxunhwang /></FadeIn>
          <FadeIn><Gallery /></FadeIn>
          <FadeIn><Location /></FadeIn>
          <FadeIn><Accounts /></FadeIn>
          <FadeIn><Guestbook /></FadeIn>
          <FadeIn><Rsvp /></FadeIn>
          <Footer />
        </main>
      </div>
    </>
  );
}
