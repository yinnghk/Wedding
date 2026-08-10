import { createClient } from "@supabase/supabase-js";

// Vite 클라이언트 및 Node SSR 환경 둘 다 대응
const supabaseUrl =
  import.meta.env?.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_URL : "") ||
  "";

const supabaseAnonKey =
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_ANON_KEY : "") ||
  "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase 환경변수가 설정되지 않았습니다. .env 파일 위치와 변수명을 확인해주세요.");
}

export const supabase = createClient(
  supabaseUrl || "https://cqoxtcgietaibrsujvwh.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

export interface GuestbookMessage {
  id?: string;
  author: string; // 작성자 이름
  content: string; // 축하 메시지
  color_index?: number; // 카드 색상 인덱스 (기본값 0)
  created_at?: string;
}

export interface RsvpSubmission {
  id?: string;
  side: string; // '신랑측' | '신부측'
  name: string; // 성함
  phone?: string; // 연락처
  attendance: string; // '참석' | '불참석'
  guest_count?: number; // 동반 인원수
  companion?: string; // 동반자 성함
  meal_preference?: string; // 식사 여부
  message?: string; // 전달 사항
  created_at?: string;
}