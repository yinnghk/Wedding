import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function Bgm() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="public/music/completely.m4a"
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
            {playing ? (
            <Volume2 className="w-5 h-5 text-white" />
            ) : (
            <VolumeX className="w-5 h-5 text-white" />
            )}
        </button>

      </div>
    </>
  );
}