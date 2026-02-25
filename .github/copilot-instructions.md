# 공감터 심리상담연구소 — AI 코딩 지침

## Tech Stack
- Next.js 16 (App Router), TypeScript, TailwindCSS v4, shadcn/ui
- Supabase (Auth, PostgreSQL, Storage), 토스페이먼츠, Vercel

## Design Tokens (안 B — 웜 아이보리)
- Primary: #8B6B4E (웜 브라운), Secondary: #C4A882, Accent: #D4845A (테라코타 CTA)
- Background: #FBF8F3, Surface: #FFFFFF, Text: #3A2E26, SubText: #8C7B6B, Border: #E8DDD0
- Heading font: Nanum Myeongjo (font-heading class)
- Body font: Pretendard (font-sans)

## Component Rules
- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수 또는 위 디자인 토큰 사용
- 카드: rounded-2xl, border-[#E8DDD0]
- 반응형: md 이상 2열, 모바일 1열
- Layout: max-w-[1200px] mx-auto px-6
- Server Component 기본, "use client"는 필요할 때만
- 이미지에 alt 필수

## Data
- Supabase 클라이언트: lib/supabase.ts
- 타입 정의: lib/types.ts
- 상수/메뉴: lib/constants.ts
