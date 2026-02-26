공감터 심리상담연구소 홈페이지 제작 Task

============================================================
확정 사항 (2025-02-25)
- 디자인: 안 B — 웜 아이보리 (Warm Ivory)
- 결제: 토스페이먼츠 (링크페이 + 위젯)
- 화상상담: 구글 미트 (고정 링크)
- 예약 결제: 상담사 확정 후 결제
- 도메인: 향후 구매 예정 (Vercel 기본 도메인 우선)
============================================================

Phase 1: 설계 문서 작성 ✅ 완료
 [✅] idea.md / ch7A.md / sample.png 분석
 [✅] 참고 사이트(비채, 온맘) 분석
 [✅] 디자인 제안서 3개 안 작성 (implementaion.md)
 [✅] 페이지 맵 & URL 구조 작성
 [✅] 와이어프레임 (주요 페이지 구조 텍스트/ASCII)
 [✅] 데이터 모델 설계 (Supabase 테이블)
 [✅] 사용자 플로우 정의
 [✅] 디자인 안 확정 → 안 B 웜 아이보리
 [✅] 협의 사항 전체 확정

Phase 2: 프로젝트 초기화 ✅ 완료
 [✅] Next.js 16 + TypeScript 프로젝트 생성
 [✅] TailwindCSS v4 + shadcn/ui 설치 및 안 B 테마 설정
 [✅] Supabase 클라이언트 설정 (lib/supabase/client.ts + server.ts)
 [✅] 토스페이먼츠 API 라우트 생성 (api/payment/*)
 [✅] copilot-instructions.md 작성
 [✅] ARCHITECTURE.md 작성
 [✅] Pretendard 폰트 설치

Phase 3: 주요 페이지 구현 ✅ 완료 (30개 라우트)
 [✅] 레이아웃 (Header/Footer/Navigation) — 안 B 디자인 토큰 적용
 [✅] 홈 페이지 (Hero, 서비스 소개, 센터소개, 프로세스, 예약 CTA)
 [✅] 센터소개 페이지 (인사말, 상담사, 오시는 길)
 [✅] 상담안내 (심리상담이란 + 4개 상세 페이지)
 [✅] 심리검사 (검사 종류 5개 소개)
 [✅] 상담예약 (대면/화상) — 상담사 확정 후 결제 플로우
 [✅] 마음톡 (목록, 글쓰기, 상세+댓글)
 [✅] 게시판 (공지사항/상담후기/칼럼 — 공유 BoardList 컴포넌트)
 [✅] 센터소식 (센터소식/이벤트)
 [✅] 로그인/회원가입 (Supabase Auth 연동)
 [✅] 마이페이지 (대시보드, 예약내역, 결제내역, 내 글)

Phase 4: 기능 구현 ✅ 완료
 [✅] 회원 인증 (Supabase Auth — 이메일/Google OAuth)
 [✅] AuthContext 전역 인증 상태 관리
 [✅] 예약 시스템 (4단계 스텝 UI — 유형→일정→메모→확인)
 [✅] 토스페이먼츠 결제 API (confirm + webhook 라우트)
 [✅] 구글 미트 링크 노출 (결제 완료 시)
 [✅] 마음톡 CRUD UI (글쓰기, 상세, 댓글)
 [✅] 게시판 CRUD UI
 [✅] Supabase 스키마 + RLS 정책 (supabase-schema.sql)
 [✅] 타입 정의 (lib/types.ts)

Phase 5: 배포 ✅ 완료
 [✅] vercel.json 설정 (icn1 리전, 보안 헤더)
 [✅] Supabase RLS 정책 작성 (supabase-schema.sql)
 [✅] .env.local.example 작성
 [✅] .gitignore 설정
 [✅] Git 초기화 및 커밋
 [ ] Vercel 대시보드에서 배포 (환경변수 입력 필요)
 [ ] Supabase SQL Editor에서 스키마 실행
 [ ] 도메인 연결 (구매 후)
