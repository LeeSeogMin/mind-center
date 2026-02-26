# Context — mind-center 프로젝트 상태

## 현재 상태
- 마지막 작업일: 2026-02-26
- 완료된 작업: 전체 UI 32개 라우트, 헤더/푸터 레이아웃, 마음톡 CRUD(Supabase 연결), 게시판 CRUD(Supabase 연결), 예약 폼(Supabase insert), OAuth callback route, middleware(보호 라우트), error/loading/not-found 페이지, RLS 정책, Supabase SQL 스키마+RLS 실행, Google OAuth 설정, Supabase Google Auth Provider 활성화, Vercel 배포, Google OAuth 앱 프로덕션 게시, 배포 URL 전체 테스트 완료
- 진행 중: 없음
- 배포 URL: https://mind-center-three.vercel.app
- 미착수 (수동): 토스페이먼츠 결제 연동
- Google OAuth 상태: 프로덕션 (외부 사용자 모두 로그인 가능)

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

## 알게 된 점
- Tailwind v4: @theme inline으로 CSS 변수 기반 설정
- Server Component 기본, "use client"는 폼/이벤트/훅 필요 시에만
- @supabase/ssr의 createBrowserClient/createServerClient 분리 패턴
- supabase-schema.sql에 9개 테이블 + 트리거 + RLS 정책 포함
- Next.js 16에서 middleware 대신 proxy를 권장하지만, middleware도 동작함
- 마음톡 목록/게시판은 Server Component에서 서버 클라이언트로 쿼리
- 마음톡 글쓰기/상세/예약은 Client Component에서 브라우저 클라이언트로 쿼리
- app/auth/callback/route.ts에서 exchangeCodeForSession()으로 OAuth 코드 교환
