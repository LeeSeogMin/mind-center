-- ============================================================
-- 추가 RLS 정책 (supabase-schema.sql 보완)
-- 기존 스키마 실행 후 SQL Editor에서 실행하세요
-- ============================================================

-- mindtalk_comments: 작성자 또는 상담사/관리자가 댓글 삭제 가능
CREATE POLICY "본인 또는 상담사 댓글 삭제" ON public.mindtalk_comments
  FOR DELETE USING (
    auth.uid() = author_id OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin'))
  );

-- news_posts: 관리자/상담사만 뉴스 수정/삭제
CREATE POLICY "관리자/상담사만 뉴스 수정" ON public.news_posts
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin'))
  );
CREATE POLICY "관리자/상담사만 뉴스 삭제" ON public.news_posts
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('counselor', 'admin'))
  );

-- reservations: 상담사가 자신의 예약 상태 수정 가능
CREATE POLICY "상담사 예약 상태 수정" ON public.reservations
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.counselors WHERE user_id = auth.uid() AND id = reservations.counselor_id)
  );
