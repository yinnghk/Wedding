export function Invitation() {
  return (
    <section className="px-6 text-center">
      <h2 
          className="text-2xl"
          style={{ fontFamily: '"Noto Serif KR", serif' }}>
        초대의 글</h2>

      <p className="mt-8 font-serif text-md leading-loose text-foreground/85 whitespace-pre-line">
        {`서로의 앞에서 가장 편안한 모습으로
평생 아이처럼 사랑할 사람을 만났습니다
매일 웃게 해주겠다는 약속을 지키고 싶어
한 번 뿐인 인생을 같이 걸어가보려고 합니다`}
      </p>

      <div className="mt-6 space-y-2 text-sm text-foreground/80">
        <p>
          <span className="text-foreground/60">이인식 · 강미선</span>
          <span className="mx-2 text-primary/40">|</span>
          <span className="font-medium">장남</span>{' '}
          <span className="text-base font-bold">이황</span>
        </p>
        <p>
          <span className="text-foreground/60">남궁현 · 최승경</span>
          <span className="mx-2 text-primary/40">|</span>
          <span className="font-medium">장녀</span>{' '}
          <span className="text-base font-bold">남궁현경</span>
        </p>
      </div>

    </section>
  );
}
