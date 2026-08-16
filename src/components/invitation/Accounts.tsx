import { useState } from "react";
import { Copy, Phone, ChevronDown } from "lucide-react";
import { toast } from "sonner";

type Account = {
  relation: string;
  name: string;
  bank: string;
  number: string;
  phone: string;
};

const groomAccounts: Account[] = [
  { relation: "신랑 아버지", name: "이인식", bank: "국민은행", number: "452502-01-030816", phone: "01038942750" },
  { relation: "신랑 어머니", name: "강미선", bank: "신한은행", number: "349-020-17366", phone: "01020932750" },
  { relation: "신랑", name: "이황", bank: "카카오뱅크", number: "7942-20-68538", phone: "01091822750" },
];

const brideAccounts: Account[] = [
  { relation: "신부 아버지", name: "남궁현", bank: "KB국민은행", number: "347802-04-295482", phone: "01027380914" },
  { relation: "신부 어머니", name: "최승경", bank: "KB국민은행", number: "347802-04-295482", phone: "01072305002" },
  { relation: "신부", name: "남궁현경", bank: "카카오뱅크", number: "7942-20-68538", phone: "01073460615" },
];

function formatPhone(p: string) {
  return p.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

function AccountList({ items }: { items: Account[] }) {
  return (
    <ul className="mt-4 space-y-3 pt-2 border-t border-stone-200/60 font-sans">
      {items.map((a) => (
        <li
          key={a.relation}
          className="rounded-xl bg-white/90 p-4 shadow-sm border border-stone-100 text-left transition"
        >
          {/* 호칭 및 전화 버튼 */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-stone-400 block mb-0.5">
                {a.relation}
              </span>
              <span className="text-stone-800 text-base font-bold">
                {a.name}
              </span>
            </div>

            {/* 전화 연결 버튼 */}
            <a
              href={`tel:${a.phone}`}
              aria-label={`${a.name}에게 전화`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs hover:bg-stone-200 active:scale-95 transition"
            >
              <Phone size={12} />
              <span>전화</span>
            </a>
          </div>

          {/* 계좌 정보 및 복사 버튼 */}
          <div className="mt-3 pt-3 border-t border-dashed border-stone-200/80 flex items-center justify-between">
            <div className="text-xs text-stone-600">
              <span className="font-medium text-stone-700 mr-1.5">{a.bank}</span>
              <span className="font-mono tracking-tight">{a.number}</span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`${a.bank} ${a.number}`);
                toast.success("계좌번호가 복사되었습니다");
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-800 text-white text-[11px] font-light active:scale-95 transition shadow-sm"
              aria-label="계좌번호 복사"
            >
              <Copy size={11} />
              <span>복사</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, items }: { title: string; items: Account[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white/70 border border-stone-200/70 py-3.5 px-4 shadow-sm backdrop-blur-sm transition-all font-sans">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-0.5"
      >
        <span className="text-stone-800 font-medium text-sm">
          {title} 계좌번호
        </span>
        <ChevronDown
          size={16}
          className={`text-stone-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <AccountList items={items} />}
    </div>
  );
}

export function Accounts() {
  return (
    <section className="bg-[#faf6f1] py-20 text-center">
      <div className="invitation-container">
        <div className="text-center">
          <h2
            className="text-2xl text-stone-800"
            style={{ fontFamily: '"Noto Serif KR", serif' }}
          >
            Account
          </h2>

          <p className="mt-4 leading-relaxed text-sm text-primary/60">
            참석이 어려우신 분들을 위해 기재했습니다
          </p>
          <p className="leading-relaxed text-sm text-primary/60">
            너그러운 마음으로 양해 부탁 드립니다
          </p>
        </div>

        {/* 아코디언 카드 영역 */}
        <div className="mt-8 space-y-3.5">
          <Section title="신랑측" items={groomAccounts} />
          <Section title="신부측" items={brideAccounts} />
        </div>
      </div>
    </section>
  );
}