import line from "@/assets/하트라인4.png";

export function Invitation() {
  return (
    <section className="bg-[#ffffff] py-25 text-center">
      <div className="invitation-container text-center">
        <div className="flex items-center justify-center gap-3">
          <section className="relative h-[18svh] w-full overflow-hidden">
            <img
              src={line}
              alt="하트라인"
              className="absolute inset-0 h-full w-full object-contain" 
            />
          </section>
        </div>

        <p className="mt-7 font-sans-serif text-sm leading-loose text-foreground/85 whitespace-pre-line">
          {`서로의 앞에서 가장 편안한 모습으로
  평생 아이처럼 사랑할 사람을 만났습니다
  매일 웃게 해주겠다는 약속을 지키고 싶어
  한 번뿐인 인생을 같이 걸어가보려고 합니다
  
  새로운 삶을 향해 손을 잡은 두 청춘을
  따뜻한 격려와 환호로 축복해 주시기 바랍니다`}
        </p>

        <div className="mt-10 space-y-1 text-sm text-foreground/80">
          <p>
            <span className="text-foreground/80">이인식 · 강미선</span>
            <span className="mx-2 text-primary/40">|</span>
            <span className="font-md">장남</span>{'  '}
            <span className="text-md font-bold"> 이황</span>
          </p>
          <p>
            <span className="text-foreground/80">남궁현 · 최승경</span>
            <span className="mx-2 text-primary/40">|</span>
            <span className="font-md">장녀</span>{'  '}
            <span className="text-md font-bold"> 남궁현경</span>
          </p>
        </div>
      </div>
    </section>

  );
}
