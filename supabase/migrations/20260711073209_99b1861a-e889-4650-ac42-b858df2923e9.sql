
CREATE TABLE public.rsvp_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  side TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  attendance TEXT NOT NULL,
  guest_count INTEGER,
  companion TEXT,
  meal_preference TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.rsvp_submissions TO anon, authenticated;
GRANT ALL ON public.rsvp_submissions TO service_role;
ALTER TABLE public.rsvp_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert rsvp" ON public.rsvp_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view rsvp" ON public.rsvp_submissions FOR SELECT USING (true);

CREATE TABLE public.guestbook_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  color_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.guestbook_messages TO anon, authenticated;
GRANT ALL ON public.guestbook_messages TO service_role;
ALTER TABLE public.guestbook_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert guestbook" ON public.guestbook_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view guestbook" ON public.guestbook_messages FOR SELECT USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.guestbook_messages;
