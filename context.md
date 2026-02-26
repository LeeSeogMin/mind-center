# Context — mind-center 프로젝트 상태

## 현재 상태
- 마지막 작업일: 2026-02-26
- 완료된 작업: 전체 UI 32개 라우트, 헤더/푸터 레이아웃, 마음톡 CRUD(Supabase 연결), 게시판 CRUD(Supabase 연결), 예약 폼(Supabase insert), OAuth callback route, middleware(보호 라우트), error/loading/not-found 페이지, RLS 정책, Supabase SQL 스키마+RLS 실행, Google OAuth 설정, Supabase Google Auth Provider 활성화, Vercel 배포, Google OAuth 앱 프로덕션 게시, 배포 URL 전체 테스트 완료, 관리자 대시보드+예약관리 페이지, 마이페이지 실데이터 연결, 구글 미트 링크 플로우, 관리자 RLS 정책 적용
- 진행 중: 없음
- 배포 URL: https://mind-center-three.vercel.app
- 미착수 (수동): 토스페이먼츠 결제 연동
- Google OAuth 상태: 프로덕션 (외부 사용자 모두 로그인 가능)
- 관리자 계정: newmind68@hs.ac.kr (role=admin), 테스트 계정: newmind69@gmail.com (role=user)

## 기술 결정 사항
- 프레임워크: Next.js 16 (App Router) + TypeScript
- 스타일: TailwindCSS v4 + shadcn/ui
- 백엔드: Supabase (Auth + PostgreSQL + Storage)
- 인증: Supabase Auth (이메일/비밀번호 + Google OAuth)
- 상태관리: React Context (AuthProvider — lib/auth-context.tsx)
- Supabase 클라이언트: @supabase/ssr (lib/supabase/client.ts + server.ts)
- 결제: 토스페이먼츠 (상담사 확정 후 결제 링크 발송)
- 화상상담: 구글 미트 (고정 링크, 결제 완료 시 노출)
- 배포: Vercel (mind-center-three.vercel.app)
- 폰트: Nanum Myeongjo (heading) + Pretendard (body)
- 디자인: 안 B 웜 아이보리 (Primary #8B6B4E, Background #FBF8F3, Accent #D4845A)

## 해결된 이슈
- lib/supabase.ts 단일 파일 → lib/supabase/client.ts + server.ts 분리 (@supabase/ssr 패턴)
- Tailwind v4에서 tailwind.config.js 없이 globals.css @theme inline 설정
- Server Component에서 쿠키 쓰기 불가 → try/catch로 감싸고 middleware에서 처리
- Supabase 관계 쿼리 타입: FK 관계로 select("*, users(name)") 시 TypeScript가 배열로 추론 → `as unknown as { name: string } | null` 캐스팅 사용
- 로그인 페이지 Google OAuth redirectTo: `window.location.origin` 사용으로 로컬/배포 환경 모두 지원
- Supabase SQL 스키마 실행 시 기존 테이블 존재 → DROP CASCADE 후 재생성으로 해결
- Google OAuth 클라이언트: mind-center-web (프로젝트 everything), 프로덕션 모드로 게시 완료
- Vercel 환경변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SITE_URL
- 관리자 RLS: admin_select_reservations + admin_update_reservations 정책을 Supabase SQL Editor에서 실행 완료
- 마이페이지 하드코딩 샘플 데이터 → Supabase 실데이터 연결 (reservations, mindtalk_posts, board_posts)
- 관리자 예약 조인 쿼리: select("*, user:user_id(id, name, email, phone)") 패턴으로 사용자 정보 포함

## 배포 전체 테스트 결과 (2026-02-26)
- 홈페이지: ✅ Hero, 서비스, 소개, 프로세스, CTA, 헤더/푸터
- 센터소개: ✅ 인사말, 대표 프로필, 센터 철학, CTA
- 상담안내: ✅ 심리상담 설명, 4개 상담분야 카드, CTA
- 상담 하위(아동청소년): ✅ 설명, 주요 상담 5개, 4단계 과정, 다른 분야 링크
- 심리검사: ✅ 5개 검사 카드(종합/MMPI-2/지능/투사/진로)
- 대면상담 예약: ✅ 비로그인 시 로그인 안내 표시
- 화상상담 예약: ✅ 비로그인 시 로그인 안내 표시
- 마음톡: ✅ 5개 게시글, 상태 뱃지, 작성자/날짜
- 게시판(공지/후기/칼럼): ✅ 게시글 목록, 탭 네비게이션, 글쓰기 버튼
- 센터소식: ✅ 4개 뉴스 카드, 센터소식/이벤트 탭
- 이벤트: ✅ 4개 이벤트, 진행중/예정/종료 뱃지
- 로그인: ✅ 이메일/비밀번호, Google 로그인 버튼
- 회원가입: ✅ 이름/이메일/연락처/비밀번호 폼

## 주요 페이지 구조

### 관리자 (app/admin/)
- `layout.tsx` — 사이드바 + 권한 가드 (admin/counselor만 접근)
- `page.tsx` — 대시보드 (통계 카드 4개 + 최근 대기 예약)
- `reservations/page.tsx` — 예약 관리 (필터 3개 + 확정/취소/완료 액션 다이얼로그)
- 헤더에 "관리자" 버튼 (Shield 아이콘, role=admin/counselor일 때 표시)

### 마이페이지 (app/mypage/)
- `page.tsx` — 대시보드 (프로필 카드 + 통계 카드 3개 + 최근 예약 3건) — 실데이터
- `reservations/page.tsx` — 예약 내역 (상태별 뱃지 + 구글 미트 입장 버튼)
- `payments/page.tsx` — 결제 내역 (payment_status=paid 필터)
- `posts/page.tsx` — 내 글 (mindtalk_posts + board_posts 병합)

### 구글 미트 플로우
사용자 예약(pending) → 관리자 확정+금액+미트링크 입력(confirmed) → 결제(paid) → 마이페이지에서 "구글 미트 입장" 버튼 노출

## 알게 된 점
- Tailwind v4: @theme inline으로 CSS 변수 기반 설정
- Server Component 기본, "use client"는 폼/이벤트/훅 필요 시에만
- @supabase/ssr의 createBrowserClient/createServerClient 분리 패턴
- supabase-schema.sql에 9개 테이블 + 트리거 + RLS 정책 포함
- Next.js 16에서 middleware 대신 proxy를 권장하지만, middleware도 동작함
- 마음톡 목록/게시판은 Server Component에서 서버 클라이언트로 쿼리
- 마음톡 글쓰기/상세/예약은 Client Component에서 브라우저 클라이언트로 쿼리
- app/auth/callback/route.ts에서 exchangeCodeForSession()으로 OAuth 코드 교환
- Supabase RLS에서 관리자 권한은 users 테이블의 role 필드로 판별 (EXISTS 서브쿼리)
- 관리자 예약 확정 시 Dialog 컴포넌트로 금액/미트링크 입력 UI 구현
- meet_link 유효성: `https://meet.google.com/` 접두사 검증
