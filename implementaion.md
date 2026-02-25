공감터 심리상담연구소 홈페이지 설계서
정선이 상담학 박사 | 공감터 심리상담연구소
기술 스택: Next.js · TypeScript · TailwindCSS · shadcn/ui · Supabase · Vercel

1. 프로젝트 개요
심리적·정서적 어려움을 겪는 분들을 위한 종합심리상담센터 홈페이지.
심리상담사, 가족상담사, 발달심리사, 놀이치료사, 임상심리사, 언어/학습치료사, 부부상담사 등 각 분야 전문가가 상주.
핵심 기능: 온라인 예약·결제, 화상상담, 마음톡(온라인 댓글상담), 게시판, 심리검사 안내.

2. 디자인 제안 — 3가지 안
IMPORTANT

아래 3개 안 중 하나를 선택해 주시면 해당 안으로 디자인 토큰과 와이어프레임을 확정합니다.

🟢 안 A — "그린 세레니티" (Green Serenity)
콘셉트: 자연·치유·안정감. 참고 이미지(sample.png)의 그린 계열 아이콘 스타일을 전체 브랜드에 적용.
비채심리상담센터(beechae.co.kr)의 부드럽고 따뜻한 느낌을 계승.

Primary     #6B9E6E  (세이지 그린)
Secondary   #A8C5A0  (연한 민트 그린)
Accent      #F4A261  (웜 오렌지 — CTA 버튼)
Background  #F7F9F5  (크림 화이트)
Surface     #FFFFFF
Text        #2C3A2D  (다크 그린-블랙)
SubText     #6B7B6C  (미디엄 그레이그린)
Border      #D8E8D4
타이포그래피: Noto Serif KR (헤딩) + Noto Sans KR (본문)
따뜻하고 고급스러운 세리프 헤딩, 가독성 높은 산세리프 본문.

레이아웃 특징:

헤더: 흰 배경, 세이지 그린 로고, 크림 하단 보더
히어로: 상담사·내담자 일러스트 배경, 그린 오버레이(30%), 흰색 텍스트
섹션 구분: 크림/흰 배경 교대 사용
카드: 흰 배경 + 세이지 그린 상단 라인 + 부드러운 그림자
아이콘: sample.png 스타일의 그린 계열 라인 일러스트
CTA 버튼: 웜 오렌지(accent) — 예약하기, 상담 신청
분위기: 자연 속 힐링 공간, 따뜻하고 전문적인, 어느 연령대나 편안하게 접근

🟤 안 B — "웜 아이보리" (Warm Ivory)
콘셉트: 고급 심리상담소의 프리미엄 느낌. 따뜻한 베이지·아이보리 계열로 심리적 안정감을 극대화.
온맘심리상담센터(onmom.kr)의 아늑하고 세련된 분위기에서 영감.

Primary     #8B6B4E  (웜 브라운)
Secondary   #C4A882  (라이트 탄)
Accent      #D4845A  (테라코타 — CTA 버튼)
Background  #FBF8F3  (크리미 아이보리)
Surface     #FFFFFF
Text        #3A2E26  (딥 워밍 브라운-블랙)
SubText     #8C7B6B  (미디엄 탄)
Border      #E8DDD0
타이포그래피: Nanum Myeongjo (헤딩) + Pretendard (본문)
전통적인 명조 헤딩으로 신뢰감, 모던 산세리프 본문으로 가독성 확보.

레이아웃 특징:

헤더: 아이보리 배경, 브라운 로고, 얇은 탄 하단 보더(sticky)
히어로: 풀스크린 워밍 베이지 배경, 좌측 대형 헤드카피, 우측 상담 이미지
섹션: 넉넉한 여백, 세심한 그리드, 최대 1200px 제한
카드: 아이보리 배경 + 탄 색 얇은 보더 + 둥근 모서리(rounded-2xl)
아이콘: 테라코타·브라운 계열 심플 아이콘
포인트 데코: 얇은 핸드라이팅 곡선 언더라인
분위기: 고급 프라이빗 클리닉, 성숙하고 세련된, 30~50대 타겟

🔵 안 C — "딥 블루그린" (Deep Blue-Green)
콘셉트: 전문성·신뢰·확신. 딥 블루그린 포인트에 화이트 기반 클린 레이아웃.
현대적이고 심플한 디자인 병원·전문기관 느낌. 젊은 세대와 직장인에게 어필.

Primary     #2A6B7C  (딥 틸 블루)
Secondary   #4A9EAF  (미디엄 틸)
Accent      #F4C842  (골든 옐로 — CTA 버튼)
Background  #F8FAFB  (쿨 화이트)
Surface     #FFFFFF
Text        #1A2B30  (딥 네이비-블랙)
SubText     #5B7380  (쿨 그레이)
Border      #DDE8EC
타이포그래피: Spoqa Han Sans Neo (헤딩) + Noto Sans KR (본문)
모던하고 기하학적인 산세리프 헤딩 & 본문으로 깔끔하고 명료한 인상.

레이아웃 특징:

헤더: 딥 틸 블루 배경 + 흰 텍스트 → 스크롤 시 흰 배경으로 전환(투명 sticky)
히어로: 딥 틸 그라디언트(좌→우) + 흰 타이틀 + 골든 CTA 버튼
섹션: 카드/그리드 중심, 아이콘 + 수치(예: "10년 경력, 2,000명 상담") 강조
카드: 흰 배경 + 딥 틸 좌측 강조선 + 부드러운 박스 쉐도우
통계/성과 섹션: 틸 블루 배경에 흰 숫자 크게 표시
아이콘: 아웃라인 아이콘(Lucide React), 틸 계열
분위기: 신뢰감 있고 전문적, 현대적 클리닉, 직장인/2030대 타겟

3. 페이지 맵 (Page Map)
공감터 심리상담연구소 (/)
│
├── 센터소개 (/about)
│   ├── 인사말 (/about/greeting)
│   ├── 상담사 소개 (/about/counselors)
│   └── 오시는 길 (/about/location)
│
├── 상담안내 (/counseling)
│   ├── 심리상담이란 (/counseling/overview)
│   ├── 아동청소년 상담 (/counseling/child)
│   ├── 성인 상담 (/counseling/adult)
│   ├── 부부·가족 상담 (/counseling/family)
│   └── 직장인·기업 상담 (/counseling/workplace)
│
├── 심리검사 (/test)
│   ├── 검사 안내 (/test/overview)
│   ├── 검사 종류 (/test/types)
│   └── 검사 예약 (/test/reservation)
│
├── 상담예약 (/reservation)
│   ├── 대면상담 예약 (/reservation/offline)
│   └── 화상상담 예약 (/reservation/online)
│
├── 마음톡 (/mindtalk)          ← 온라인 댓글상담
│   ├── 글쓰기 (/mindtalk/new)
│   └── 상담글 상세 (/mindtalk/[id])
│
├── 게시판 (/board)
│   ├── 공지사항 (/board/notice)
│   ├── 상담후기 (/board/review)
│   └── 칼럼 (/board/column)
│
├── 센터소식 (/news)
│   ├── 센터소식 (/news/center)
│   └── 이벤트 (/news/event)
│
└── 회원 영역
    ├── 로그인 (/login)
    ├── 회원가입 (/signup)
    └── 마이페이지 (/mypage)
        ├── 예약 내역 (/mypage/reservations)
        ├── 결제 내역 (/mypage/payments)
        └── 내 글 (/mypage/posts)
4. 주요 페이지 URL 구조 (Next.js App Router)
페이지	URL	파일 경로
홈	/	app/page.tsx
센터소개	/about	app/about/page.tsx
상담사 소개	/about/counselors	app/about/counselors/page.tsx
상담안내	/counseling	app/counseling/page.tsx
상담상세	/counseling/[slug]	app/counseling/[slug]/page.tsx
심리검사	/test	app/test/page.tsx
대면예약	/reservation/offline	app/reservation/offline/page.tsx
화상예약	/reservation/online	app/reservation/online/page.tsx
마음톡 목록	/mindtalk	app/mindtalk/page.tsx
마음톡 작성	/mindtalk/new	app/mindtalk/new/page.tsx
마음톡 상세	/mindtalk/[id]	app/mindtalk/[id]/page.tsx
공지사항	/board/notice	app/board/notice/page.tsx
상담후기	/board/review	app/board/review/page.tsx
칼럼	/board/column	app/board/column/page.tsx
센터소식	/news/center	app/news/center/page.tsx
이벤트	/news/event	app/news/event/page.tsx
로그인	/login	app/login/page.tsx
회원가입	/signup	app/signup/page.tsx
마이페이지	/mypage	app/mypage/page.tsx
5. 사용자 플로우 (User Flow)
플로우 1 — 일반 방문자가 대면 상담 예약하는 경우
홈(/) 
  → 상담안내 메뉴 클릭 → 본인에게 맞는 상담 유형 확인
  → "상담예약" 버튼 클릭 → 로그인 필요 안내
  → 로그인(/login) 또는 회원가입(/signup)
  → 대면예약 페이지(/reservation/offline)
  → 날짜·상담사·시간 선택
  → 결제(신용카드) 
  → 예약 확인(이메일 발송)
  → 마이페이지(/mypage/reservations)에서 내역 확인
플로우 2 — 마음톡 상담 이용
홈(/) → 마음톡 메뉴 → 마음톡 게시글 목록(/mindtalk)
  → "글 작성" 버튼 → 로그인/회원가입 필요
  → 상담 내용 작성(공개/비공개 선택) → 제출
  → 상담사가 댓글로 답변 → 알림 발송
  → 내담자가 댓글 확인
플로우 3 — 심리검사 예약
심리검사(/test) → 검사 종류 확인 → 검사 예약 이동
  → 로그인 → 날짜·검사 유형 선택 → 결제 → 예약 확인
6. 컴포넌트 계층 (Component Hierarchy)
Layout (app/layout.tsx)
├── Header
│   ├── TopBar (연락처, SNS 링크 — 데스크톱만)
│   ├── Logo
│   ├── MainNav (메뉴 링크들)
│   ├── SearchButton
│   └── AuthButtons (로그인/회원가입 or 마이페이지)
├── MobileMenu (햄버거 메뉴)
├── Main (페이지 컨텐츠)
└── Footer
    ├── FooterInfo (센터명, 주소, 전화)
    ├── FooterLinks (개인정보처리방침, 이용약관)
    └── FooterSocial (SNS)
홈 페이지 (/)
├── HeroSection
│   ├── HeroText (헤드카피, 서브카피)
│   └── HeroButtons (예약하기, 센터소개)
├── ServiceSection (상담 프로그램 아이콘 그리드)
│   └── ServiceCard × N
├── AboutSection (센터 소개 + 상담사 사진)
├── CounselorSection (상담사 카드)
│   └── CounselorCard × N
├── ProcessSection (상담 프로세스 단계)
├── TestimonialSection (상담후기 슬라이더)
│   └── TestimonialCard × N
├── ReservationCTA (예약 유도 배너)
└── NewsSection (최신 게시글 + 이벤트)
예약 페이지
├── CalendarPicker (날짜 선택)
├── CounselorSelect (상담사 선택)
├── TimeSlotPicker (시간 선택)
├── ReservationForm (개인정보 입력)
└── PaymentForm (신용카드 결제)
7. 데이터 모델 (Supabase)
테이블 구조
sql
-- 사용자
users (Supabase Auth 기본 테이블 확장)
  id           UUID  PK (auth.users 참조)
  name         TEXT  NOT NULL
  phone        TEXT
  role         TEXT  DEFAULT 'user'  -- 'user' | 'counselor' | 'admin'
  created_at   TIMESTAMPTZ
-- 상담사 프로필
counselors
  id           UUID  PK
  user_id      UUID  FK → users.id
  title        TEXT  -- "심리상담사", "놀이치료사" 등
  bio          TEXT
  specialties  TEXT[] -- 전문분야 배열
  image_url    TEXT
  is_active    BOOL  DEFAULT true
-- 예약 가능 슬롯
availability_slots
  id            UUID  PK
  counselor_id  UUID  FK → counselors.id
  date          DATE  NOT NULL
  start_time    TIME  NOT NULL
  end_time      TIME  NOT NULL
  type          TEXT  -- 'offline' | 'online'
  is_reserved   BOOL  DEFAULT false
-- 예약
reservations
  id              UUID  PK
  user_id         UUID  FK → users.id
  counselor_id    UUID  FK → counselors.id
  slot_id         UUID  FK → availability_slots.id
  type            TEXT  -- 'offline' | 'online'
  status          TEXT  -- 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_id      TEXT  -- 결제 ID
  payment_status  TEXT  -- 'unpaid' | 'paid' | 'refunded'
  amount          INT   -- 결제금액(원)
  memo            TEXT  -- 상담 메모
  created_at      TIMESTAMPTZ
-- 마음톡 (온라인 댓글상담)
mindtalk_posts
  id           UUID  PK
  user_id      UUID  FK → users.id
  title        TEXT
  content      TEXT  NOT NULL
  is_private   BOOL  DEFAULT false
  is_answered  BOOL  DEFAULT false
  created_at   TIMESTAMPTZ
mindtalk_comments
  id           UUID  PK
  post_id      UUID  FK → mindtalk_posts.id
  author_id    UUID  FK → users.id  -- 상담사
  content      TEXT  NOT NULL
  created_at   TIMESTAMPTZ
-- 게시판
board_posts
  id           UUID  PK
  author_id    UUID  FK → users.id
  category     TEXT  -- 'notice' | 'review' | 'column'
  title        TEXT  NOT NULL
  content      TEXT  NOT NULL
  view_count   INT   DEFAULT 0
  created_at   TIMESTAMPTZ
-- 심리검사 종류
psychological_tests
  id           UUID  PK
  name         TEXT  NOT NULL
  description  TEXT
  duration_min INT
  price        INT
  is_active    BOOL  DEFAULT true
-- 이벤트/소식
news_posts
  id           UUID  PK
  author_id    UUID  FK → users.id
  category     TEXT  -- 'center' | 'event'
  title        TEXT  NOT NULL
  content      TEXT  NOT NULL
  thumbnail    TEXT
  starts_at    TIMESTAMPTZ  -- 이벤트 시작일
  ends_at      TIMESTAMPTZ  -- 이벤트 종료일
  created_at   TIMESTAMPTZ
8. 기술 스택 & 설계 원칙
영역	기술	비고
프레임워크	Next.js 15 (App Router)	SSR/SSG 혼합
언어	TypeScript	전체 타입 안전
스타일링	TailwindCSS v4 + shadcn/ui	CSS 변수 기반 디자인 토큰
UI 컴포넌트	shadcn/ui (Button, Card, Dialog, Input, Calendar, Tabs 등)	
인증	Supabase Auth	이메일/소셜 로그인
DB	Supabase PostgreSQL	RLS 적용
파일 저장	Supabase Storage	프로필 이미지, 게시글 첨부
결제	포트원(아임포트) v2 또는 토스페이먼츠	신용카드 결제
화상상담	아임웹 화상 또는 Zoom API 연동 TBD	
배포	Vercel	Edge Runtime
폰트	Google Fonts (결정 안에 따라)	next/font 사용
9. 주요 페이지 와이어프레임 (텍스트)
홈 페이지 (/)
┌─────────────────────────────────────────────────────────────┐
│  HEADER  [로고 공감터]  센터소개 상담안내 심리검사 상담예약 마음톡 게시판  [🔍 로그인]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   HERO SECTION (풀스크린 or 80vh)                           │
│   ┌─────────────────────┐  ┌───────────────────┐          │
│   │ 마음이 힘들 때,      │  │                   │          │
│   │ 공감터가 함께합니다  │  │  [상담사 이미지]   │          │
│   │                     │  │                   │          │
│   │ [상담예약하기 →]    │  │                   │          │
│   │ [센터 알아보기]     │  │                   │          │
│   └─────────────────────┘  └───────────────────┘          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│   상담 프로그램 (아이콘 7개 가로 나열)                       │
│   ○아동청소년  ○성인  ○커플부부  ○가족  ○직장인  ○소상공인  ○기업단체  │
├─────────────────────────────────────────────────────────────┤
│   센터 소개 (좌: 텍스트, 우: 이미지)                        │
│   "정선이 박사가 이끌어가는..."                              │
├─────────────────────────────────────────────────────────────┤
│   상담 프로세스 (4단계 가로 아이콘)                          │
│   ①문의·신청  →  ②상담사 배정  →  ③상담 진행  →  ④사후관리   │
├─────────────────────────────────────────────────────────────┤
│   상담후기 (카드 3개 or 슬라이더)                            │
├─────────────────────────────────────────────────────────────┤
│   예약 CTA 배너 (배경색 강조)                                │
│   "지금 바로 예약하세요"  [대면상담 예약] [화상상담 예약]    │
├─────────────────────────────────────────────────────────────┤
│   최신 소식 (게시글 3개)                                     │
├─────────────────────────────────────────────────────────────┤
│  FOOTER  [로고] 주소·전화·이메일  개인정보처리방침  이용약관  │
└─────────────────────────────────────────────────────────────┘
상담예약 페이지 (/reservation/offline)
┌────────────────────────────────────────────────────┐
│  상담예약 > 대면상담 예약                           │
├──────────────┬─────────────────────────────────────┤
│              │                                     │
│   STEP ①    │ 상담 유형 선택                      │
│   유형선택   │ [아동청소년] [성인] [커플부부] [가족] │
│              │                                     │
├──────────────┤─────────────────────────────────────┤
│              │                                     │
│   STEP ②    │ 상담사 선택                         │
│   상담사선택 │ ┌────┐ ┌────┐ ┌────┐              │
│              │ │사진│ │사진│ │사진│              │
│              │ │이름│ │이름│ │이름│              │
│              │ └────┘ └────┘ └────┘              │
│              │                                     │
├──────────────┤─────────────────────────────────────┤
│              │                                     │
│   STEP ③    │ 날짜 & 시간 선택                    │
│   일정선택   │ [Calendar]  [시간 슬롯 버튼들]      │
│              │                                     │
├──────────────┤─────────────────────────────────────┤
│              │                                     │
│   STEP ④    │ 결제 및 예약 확정                   │
│   결제       │ 예약 요약 | 결제 금액               │
│              │ [신용카드 결제] 버튼                │
│              │                                     │
└──────────────┴─────────────────────────────────────┘
10. 개발 단계별 계획
단계	내용	기간
Phase 1	프로젝트 초기화, 레이아웃(Header/Footer), 홈 페이지	1~2주
Phase 2	정적 정보 페이지 (센터소개, 상담안내, 심리검사)	1주
Phase 3	인증 (로그인/회원가입, Supabase Auth)	1주
Phase 4	예약 시스템 (캘린더, 슬롯, 예약 CRUD)	1~2주
Phase 5	결제 연동 (포트원 또는 토스페이먼츠)	1주
Phase 6	마음톡 + 게시판 + 센터소식 CRUD	1~2주
Phase 7	마이페이지, 관리자 기능	1주
Phase 8	반응형 최적화, SEO, 테스트, Vercel 배포	1주
✅ 협의 확정 사항 (2025-02-25 확정)

| 항목 | 확정 내용 |
|------|----------|
| 디자인 안 | **안 B — 웜 아이보리 (Warm Ivory)** |
| 결제 PG사 | **토스페이먼츠** |
| 화상상담 방식 | **구글 미트 (Google Meet)** |
| 예약 결제 시점 | **상담사 확정 후 결제** (토스 링크페이 활용) |
| 도메인 | 현재 없음, 향후 구매 예정 (Vercel 기본 도메인으로 우선 배포) |

### 1인 운영 예약·결제 워크플로우

상담사 1명으로 시작하므로, 행정 부담을 최소화하는 반자동화 워크플로우를 적용한다.

```
① 예약 접수
   고객이 예약 페이지에서 날짜·시간·상담유형 선택 → 예약 신청 (status: pending)

② 일정 확인 & 확정
   상담사가 관리 화면(또는 알림)에서 예약 확인 → "확정" 버튼 클릭 (status: confirmed)

③ 결제 요청
   확정 시 토스페이먼츠 링크페이 결제 URL을 고객에게 자동 발송 (카카오톡/이메일)

④ 결제 완료 & 상담 안내
   결제 완료 시 (payment_status: paid)
   - 상담사에게 알림
   - 고객에게 상담 안내 발송
   - 화상상담인 경우: 구글 미트 링크 포함
```

### 구글 미트 활용 방식

- **고정 링크 활용**: 상담사 1명이므로 하나의 고정 미트 링크를 '상담실'처럼 운영
- **결제 완료 시만 공개**: 결제 완료 페이지 또는 안내 문자에서만 미트 링크를 노출하여 노쇼 방지
- 화상예약 페이지(/reservation/online)에서는 미트 링크를 숨기고, 결제 완료 후 마이페이지에서 확인 가능

### 확정에 따른 기술 스택 변경

| 영역 | 변경 전 | 변경 후 |
|------|---------|---------|
| 결제 | 포트원 v2 또는 토스페이먼츠 | **토스페이먼츠** (링크페이 + 위젯) |
| 화상상담 | 아임웹 화상 또는 Zoom API TBD | **구글 미트 고정 링크** |
| 폰트 | 결정 안에 따라 | **Nanum Myeongjo (헤딩) + Pretendard (본문)** |
| 디자인 토큰 | 미확정 | **안 B 웜 아이보리 컬러 팔레트** |