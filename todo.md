# TODO — mind-center

## 1단계: 기본 구조 (Ch7~8)
- [x] ARCHITECTURE.md 작성 (→ CLAUDE.md로 통합)
- [x] copilot-instructions.md 작성
- [x] shadcn/ui 초기화 + 테마 설정
- [x] 헤더/푸터 레이아웃
- [x] 홈 페이지 (Hero, Service, About, Process, CTA)
- [x] 전체 32개 라우트 UI 구현
- [x] Supabase 프로젝트 생성 + .env.local 설정
- [x] lib/supabase/client.ts + server.ts (@supabase/ssr)
- [x] supabase-schema.sql 작성 (9개 테이블 + 트리거 + RLS)
- [x] context.md + todo.md 생성
- [x] Supabase 연결 테스트 페이지 (app/test-connection)
- [x] Supabase SQL Editor에서 스키마 실행 (🖱️ 수동)

## 2단계: 인증 (Ch9)
- [x] 로그인 페이지 (이메일/비밀번호 + Google OAuth UI)
- [x] 회원가입 페이지 (이름, 이메일, 연락처, 비밀번호)
- [x] AuthProvider + useAuth 컨텍스트
- [x] lib/auth.ts 헬퍼 함수
- [x] app/auth/callback/route.ts (OAuth 코드 교환)
- [x] middleware.ts (보호 라우트: /mypage, /mindtalk/new, /reservation)
- [x] 로그인 redirectTo → /auth/callback 수정
- [x] Google Cloud Console OAuth 설정 (🖱️ 수동)
- [x] Supabase Auth Provider Google 활성화 (🖱️ 수동)

## 3단계: CRUD 연결 (Ch10)
- [x] 마음톡 목록: Supabase 쿼리 (Server Component)
- [x] 마음톡 글쓰기: Supabase insert + toast 알림
- [x] 마음톡 상세: Supabase 쿼리 + 댓글 작성
- [x] 게시판 (공지/후기/칼럼): Supabase 쿼리 (Server Component)
- [x] 예약 폼 (대면/화상): Supabase insert + 상담사 조회

## 4단계: 보안 & UX (Ch11~12)
- [x] RLS 정책 (supabase-schema.sql에 포함)
- [x] RLS 보완 정책 (supabase-rls-supplement.sql)
- [x] app/error.tsx (에러 바운더리)
- [x] app/loading.tsx (로딩 스피너)
- [x] app/not-found.tsx (404 페이지)
- [x] 폼 유효성 검증 (마음톡 제목/내용 필수, toast 에러 메시지)

## 5단계: 배포 (Ch13)
- [x] npm run build 로컬 빌드 성공 확인
- [x] Supabase SQL Editor에서 supabase-rls-supplement.sql 실행 (🖱️ 수동)
- [x] Vercel 프로젝트 연결 (🖱️ 수동)
- [x] Vercel 환경변수 등록 (🖱️ 수동)
- [x] 배포 URL에서 전체 테스트 (🖱️ 수동)
- [x] Google Console에 배포 URL 추가 (🖱️ 수동)
- [x] Google OAuth 앱 게시 — 테스트 모드 → 프로덕션 (🖱️ 수동)

## 진행률: 31/31 (100%) — MVP 완료!

## 5.5단계: 관리자 + 마이페이지 실데이터 + 구글 미트
- [x] lib/types.ts — Reservation에 meet_link, user 필드 추가
- [x] middleware.ts — /admin/:path* 보호 추가
- [x] supabase-rls-supplement.sql — 관리자 SELECT/UPDATE RLS 정책 추가
- [x] Supabase SQL Editor에서 관리자 RLS 2개 실행 (🖱️ 수동)
- [x] app/admin/layout.tsx — 관리자 레이아웃 + 권한 가드
- [x] app/admin/loading.tsx — 로딩 스피너
- [x] app/admin/page.tsx — 관리자 대시보드 (통계 카드 + 최근 대기 예약)
- [x] app/admin/reservations/page.tsx — 예약 관리 (필터 + 확정/취소/완료 다이얼로그)
- [x] components/layout/header.tsx — 관리자 버튼 추가 (role=admin/counselor)
- [x] app/mypage/page.tsx — 하드코딩 → Supabase 실데이터 연결
- [x] app/mypage/reservations/page.tsx — 실데이터 + 구글 미트 입장 버튼
- [x] app/mypage/payments/page.tsx — 실데이터 (payment_status=paid)
- [x] app/mypage/posts/page.tsx — 실데이터 (mindtalk + board 병합)
- [x] Supabase에서 newmind68@hs.ac.kr role=admin 설정 (🖱️ 수동)
- [x] Playwright MCP로 전체 동작 확인
- [x] Vercel 재배포

## 진행률: 47/47 (100%) — 관리자+마이페이지 완료!

---

## 6단계: 결제 연동 (추후)
- [ ] 토스페이먼츠 개발자센터 회원가입 + 테스트 키 발급 (🖱️ 수동)
- [ ] .env.local에 NEXT_PUBLIC_TOSS_CLIENT_KEY, TOSS_SECRET_KEY 등록
- [ ] Vercel 환경변수에 토스 키 등록 (🖱️ 수동)
- [ ] app/api/payment/confirm/route.ts — 결제 승인 API
- [ ] app/api/payment/webhook/route.ts — 결제 웹훅 처리
- [ ] 예약 확정(confirmed) 시 결제 링크 발송 로직
- [x] 결제 완료(paid) 시 화상상담 구글 미트 링크 노출 — 구조 구현 완료
- [ ] 결제 플로우 테스트 (테스트 키 기준)
