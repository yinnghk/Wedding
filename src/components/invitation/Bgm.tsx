import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BgmProps {
  play?: boolean;
}

export function Bgm({ play }: BgmProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // 브라우저 자동재생 정책으로 막힌 경우 예외 처리
          console.log("자동 재생 정책으로 인해 음악이 차단되었습니다:", error);
          setIsPlaying(false);
        });
    }
  }, [play]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="/music/completely.m4a"
        loop
      />

      <div className="relative">
        <button
            onClick={toggleMusic}
            className="
            absolute
            top-6
            right-6
            z-50
            w-11
            h-11
            rounded-full
            bg-white/20
            backdrop-blur-xl
            border border-white/20
            shadow-lg
            flex items-center justify-center
            "
        >
            {isPlaying ? (
            <Volume2 className="w-5 h-5 text-white" />
            ) : (
            <VolumeX className="w-5 h-5 text-white" />
            )}
        </button>

      </div>
    </div>
  );
}