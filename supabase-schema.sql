-- ============================================================
-- 공감터 심리상담연구소 — Supabase 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요
-- ============================================================

-- 1. users 테이블 (Supabase Auth 확장)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'counselor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 새 유저 가입 시 자동으로 users 레코드 생성하는 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. counselors 테이블
CREATE TABLE public.counselors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  bio TEXT,
  specialties TEXT[] DEFAULT '{}',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. availability_slots 테이블
CREATE TABLE public.availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  counselor_id UUID NOT NULL REFERENCES public.counselors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('offline', 'online')),
  is_reserved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. reservations 테이블
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  counselor_id UUID NOT NULL REFERENCES public.counselors(id),
  slot_id UUID REFERENCES public.availability_slots(id),
  type TEXT NOT NULL CHECK (type IN ('offline', 'online')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_id TEXT,
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  amount INTEGER DEFAULT 0,
  memo TEXT,
  meet_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. mindtalk_posts 테이블
CREATE TABLE public.mindtalk_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_private BOOLEAN DEFAULT false,
  is_answered BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. mindtalk_comments 테이블
CREATE TABLE public.mindtalk_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.mindtalk_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. board_posts 테이블
CREATE TABLE public.board_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.users(id),
  category TEXT NOT NULL CHECK (category IN ('notice', 'review', 'column', 'qna')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. psychological_tests 테이블
CREATE TABLE public.psychological_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  duration_min INTEGER,
  price INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. board_comments 테이블
CREATE TABLE public.board_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.board_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 초기 데이터 (시드)
-- ============================================================

-- 기본 상담사: 정선이 박사 (1인 상담센터)
INSERT INTO public.counselors (title, bio, specialties, is_active)
VALUES (
  '정선이 상담학 박사',
  '공감터 심리상담연구소 대표 상담사',
  ARRAY['아동청소년', '성인', '부부·가족', '직장인·기업'],
  true
) ON CONFLICT DO NOTHING;

-- ============================================================
-- Row Level Security (RLS) 정책
-- ============================================================

-- users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "누구나 사용자 기본 정보 조회" ON public.users FOR SELECT USING (true);
CREATE POLICY "본인만 프로필 수정" ON public.users FOR UPDATE USING (auth.uid() = id);

-- counselors
ALTER TABLE public.counselors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "누구나 상담사 조회" ON public.counselors FOR SELECT USING (true);
CREATE POLICY "관리자만 상담사 관리" ON public.counselors FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- availability_slots
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "누구나 슬롯 조회" ON public.availability_slots FOR SELECT USING (true);
CREATE POLICY "상담사/관리자만 슬롯 관리" ON public.availability_slots FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin'))
);

-- reservations
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "본인 예약만 조회" ON public.reservations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "상담사는 자신의 예약 조회" ON public.reservations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.counselors WHERE user_id = auth.uid() AND id = reservations.counselor_id)
);
CREATE POLICY "로그인 사용자 예약 생성" ON public.reservations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "본인 예약 수정" ON public.reservations FOR UPDATE USING (auth.uid() = user_id);

-- mindtalk_posts
ALTER TABLE public.mindtalk_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "공개 글 누구나 조회" ON public.mindtalk_posts FOR SELECT USING (
  is_private = false OR auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin'))
);
CREATE POLICY "로그인 사용자 마음톡 작성" ON public.mindtalk_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "본인 마음톡 수정" ON public.mindtalk_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "본인 마음톡 삭제" ON public.mindtalk_posts FOR DELETE USING (auth.uid() = user_id);

-- mindtalk_comments
ALTER TABLE public.mindtalk_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "댓글 조회 (글 접근 권한에 따름)" ON public.mindtalk_comments FOR SELECT USING (true);
CREATE POLICY "로그인 사용자 댓글 작성" ON public.mindtalk_comments FOR INSERT WITH CHECK (auth.uid() = author_id);

-- board_posts
ALTER TABLE public.board_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "누구나 게시글 조회" ON public.board_posts FOR SELECT USING (true);
CREATE POLICY "로그인 사용자 후기 작성" ON public.board_posts FOR INSERT WITH CHECK (
  auth.uid() = author_id AND (
    category IN ('review', 'qna') OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin'))
  )
);
CREATE POLICY "본인 게시글 수정" ON public.board_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "본인 게시글 삭제" ON public.board_posts FOR DELETE USING (auth.uid() = author_id);

-- psychological_tests
ALTER TABLE public.psychological_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "누구나 심리검사 조회" ON public.psychological_tests FOR SELECT USING (true);
CREATE POLICY "관리자만 심리검사 관리" ON public.psychological_tests
  FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin')));

-- board_comments
ALTER TABLE public.board_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "누구나 댓글 조회" ON public.board_comments FOR SELECT USING (true);
CREATE POLICY "로그인 사용자 댓글 작성" ON public.board_comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "본인/상담사 댓글 삭제" ON public.board_comments FOR DELETE USING (
  auth.uid() = author_id OR
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin'))
);

-- 관리자 사용자 역할 수정 정책
CREATE POLICY "관리자 사용자 역할 수정" ON public.users
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- 댓글 삭제 정책 (본인 또는 상담사/관리자)
CREATE POLICY "본인/상담사 댓글 삭제" ON public.mindtalk_comments FOR DELETE USING (
  auth.uid() = author_id OR
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin'))
);

-- ============================================================
-- 함수
-- ============================================================

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE board_posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
