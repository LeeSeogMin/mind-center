# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

공감터 심리상담연구소 — 종합심리상담센터 홈페이지. 정선이 상담학 박사가 운영하는 1인 상담센터로, 대면/화상 상담 예약, 온라인 댓글상담(마음톡), 게시판, 심리검사 안내 등을 제공.

## Build & Dev Commands

```bash
npm run dev        # 개발 서버 (localhost:3000)
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 실행
```

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** TailwindCSS v4 + shadcn/ui
- **Backend:** Supabase (Auth + PostgreSQL + Storage)
- **Payment:** 토스페이먼츠 (상담사 확정 후 결제)
- **Video:** 구글 미트 (고정 링크, 결제 완료 시 노출)
- **Deploy:** Vercel (icn1 리전)
- **Fonts:** Nanum Myeongjo (heading) + Pretendard (body)

## Design — 안 B 웜 아이보리 (Warm Ivory)

| Token | Value |
|-------|-------|
| Primary | #8B6B4E |
| Secondary | #C4A882 |
| Accent (CTA) | #D4845A |
| Background | #FBF8F3 |
| Text | #3A2E26 |
| SubText | #8C7B6B |
| Border | #E8DDD0 |

Tailwind 기본 컬러 직접 사용 금지. 위 디자인 토큰 또는 CSS 변수 사용.

## Architecture

- `app/` — Next.js App Router 페이지 (30개 라우트)
- `components/layout/` — Header, Footer
- `components/home/` — 홈 페이지 섹션 컴포넌트
- `components/ui/` — shadcn/ui 컴포넌트
- `components/board-list.tsx` — 게시판 공유 컴포넌트
- `lib/supabase/client.ts` — Supabase 브라우저 클라이언트 (`createBrowserClient` from `@supabase/ssr`)
- `lib/supabase/server.ts` — Supabase 서버 클라이언트 (`createServerClient` from `@supabase/ssr`)
- `lib/auth-context.tsx` — 전역 인증 상태 (AuthProvider, useAuth)
- `lib/types.ts` — TypeScript 타입 정의
- `lib/constants.ts` — 네비게이션, 상담 서비스, 프로세스 상수
- `app/api/payment/` — 토스페이먼츠 결제 확인/웹훅 API

## Key Patterns

- Server Component 기본. `"use client"` 는 폼/이벤트/훅 필요 시에만
- 레이아웃: `max-w-[1200px] mx-auto px-6`
- 카드: `rounded-2xl border-[#E8DDD0]`
- 헤딩: `font-heading` 클래스 사용 (Nanum Myeongjo)
- 예약 플로우: 신청(pending) → 상담사 확정(confirmed) → 토스 결제링크 발송 → 결제(paid)

## Setup

1. `.env.local`에 Supabase URL/Key, 토스페이먼츠 키 입력
2. Supabase SQL Editor에서 `supabase-schema.sql` 실행
3. `npm run dev`로 개발 서버 시작
