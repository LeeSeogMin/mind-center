# Architecture — 공감터 심리상담연구소

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- TailwindCSS v4 + shadcn/ui
- Supabase (Auth + PostgreSQL + Storage)
- 토스페이먼츠 (결제)
- 구글 미트 (화상상담)
- Vercel (배포)

## Design — 안 B 웜 아이보리 (Warm Ivory)
- Primary: #8B6B4E, Secondary: #C4A882, Accent: #D4845A
- Background: #FBF8F3, Text: #3A2E26, SubText: #8C7B6B, Border: #E8DDD0
- Font: Nanum Myeongjo (heading) + Pretendard (body)

## Page Map
```
/ — 홈
├── /about — 인사말
│   ├── /about/counselors — 상담사 소개
│   └── /about/location — 오시는 길
├── /counseling — 심리상담이란
│   └── /counseling/[slug] — 상담 상세 (child, adult, family, workplace)
├── /test — 심리검사
├── /reservation/offline — 대면상담 예약
├── /reservation/online — 화상상담 예약
├── /mindtalk — 마음톡 목록
│   ├── /mindtalk/new — 글쓰기
│   └── /mindtalk/[id] — 상세
├── /board/notice — 공지사항
├── /board/review — 상담후기
├── /board/column — 칼럼
├── /news/center — 센터소식
├── /news/event — 이벤트
├── /login — 로그인
├── /signup — 회원가입
└── /mypage — 마이페이지
    ├── /mypage/reservations
    ├── /mypage/payments
    └── /mypage/posts
```

## Component Hierarchy
```
Layout (app/layout.tsx)
├── Header (components/layout/header.tsx)
├── Main (page content)
└── Footer (components/layout/footer.tsx)

Home (/)
├── HeroSection
├── ServiceSection
├── AboutSection
├── ProcessSection
└── ReservationCTA
```

## Data Model (Supabase)
- users → counselors (1:1)
- counselors → availability_slots (1:N)
- users → reservations (1:N)
- users → mindtalk_posts → mindtalk_comments
- users → board_posts
- news_posts, psychological_tests

## 예약·결제 플로우 (상담사 확정 후 결제)
1. 고객: 예약 신청 (status: pending)
2. 상담사: 확정 (status: confirmed)
3. 시스템: 토스 링크페이 URL 발송
4. 고객: 결제 완료 (payment_status: paid)
5. 화상상담 시: 구글 미트 링크 노출
