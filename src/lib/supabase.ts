import { createClient } from "@supabase/supabase-js";

// 실제 URL과 Publishable Key 직접 입력
const supabaseUrl = "https://cqoxtcgietaibrsujvwh.supabase.co";
const supabaseAnonKey = "sb_publishable_YJaWKJ_0iHXpbLI2crD_0g_rjXmrtoV"; // (eyJ로 시작하는 실제 키)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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