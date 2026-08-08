import { useState } from "react";
import { Copy, Phone } from "lucide-react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

type Account = {
  relation: string;
  name: string;
  bank: string;
  number: string;
  phone: string;
};

const groomAccounts: Account[] = [
  { relation: "신랑", name: "이황", bank: "카카오", number: "7942-20-68538", phone: "01091822750" },
  { relation: "신랑 아버지", name: "이인식", bank: "국민", number: "347802-04-295482", phone: "01023456789" },
  { relation: "신랑 어머니", name: "강미선", bank: "국민", number: "347802-04-295482", phone: "01034567890" },
];
const brideAccounts: Account[] = [
  { relation: "신부", name: "남궁현경", bank: "카카오", number: "7942-20-68538", phone: "01073460615" },
  { relation: "신부 아버지", name: "남궁현", bank: "국민", number: "347802-04-295482", phone: "01027380914" },
  { relation: "신부 어머니", name: "최승경", bank: "국민", number: "347802-04-295482", phone: "01072305002" },
];

function formatPhone(p: string) {
  return p.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

function AccountList({ items }: { items: Account[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((a) => (
        <li key={a.relation} className="rounded-xl bg-card p-3 border border-border">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-foreground/60">{a.relation}</p>
              <p className="font-serif">{a.name}</p>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${a.phone}`}
                aria-label={`${a.name}에게 전화`}
                className="grid place-items-center h-8 w-8 rounded-full bg-secondary text-primary active:scale-95 transition"
              >
                <Phone size={14} />
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${a.bank} ${a.number}`);
                  toast.success("계좌번호가 복사되었습니다");
                }}
                className="grid place-items-center h-8 w-8 rounded-full bg-primary text-primary-foreground active:scale-95 transition"
                aria-label="계좌번호 복사"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-foreground/80">
            {a.bank} <span className="font-mono">{a.number}</span>
          </p>
          <p className="mt-0.5 text-xs text-foreground/55 font-mono">{formatPhone(a.phone)}</p>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, items }: { title: string; items: Account[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-card/70 border border-border p-4">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between">
        <span className="font-serif">{title}</span>
        <ChevronDown size={18} className={`text-primary transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <AccountList items={items} />}
    </div>
  );
}

export function Accounts() {
  return (
    <section className="px-6">
      <div className="text-center">
        <h2 
          className="text-2xl"
          style={{ fontFamily: '"Noto Serif KR", serif' }}>
          마음 전하실 곳</h2>
      </div>
      <div className="mt-6 space-y-3">
        <Section title="신랑측" items={groomAccounts} />
        <Section title="신부측" items={brideAccounts} />
      </div>
    </section>
  );
}
