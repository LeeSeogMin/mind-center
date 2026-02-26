# Chapter 9. Supabase Authentication — A회차: 강의

> **미션**: 공감터(`mind-center`) 웹사이트에 Google OAuth 로그인을 연결한다

---

## 바이브코딩 원칙 (이번 장)

이번 장의 바이브코딩은 “**인증 흐름을 글로 먼저 고정**하고, Copilot이 그 흐름대로만 코드를 만들게 하는 것”이 핵심이다. 인증은 작은 누락(redirect URL, 쿠키, 미들웨어) 하나로 전체가 안 된다.

1. **로그인 방식 1개로 고정**: 이번 장은 “Google OAuth”만. 이메일/비밀번호 등 다른 방식을 Copilot이 섞지 못하게 막는다.
2. **리다이렉트/콜백을 명시**: 로컬/배포 각각의 Redirect URL, Callback URL, 로그인 후 이동 경로를 프롬프트에 포함한다.
3. **세션 저장 위치를 명시**: App Router에서의 쿠키/세션 처리 방식(예: `@supabase/ssr` 사용 여부)을 확정한다.
4. **보호 범위를 정의**: “어떤 페이지/행동이 로그인 필요인지”를 목록으로 정한다. (예: 글쓰기/수정/삭제)
5. **검증 시나리오로 확인**: (1) 로그인 성공 (2) 새로고침 후 유지 (3) 로그아웃 (4) 비로그인 접근 차단 4가지를 통과해야 완료다.

---

## Copilot 프롬프트 (복사/붙여넣기)

```text
너는 GitHub Copilot Chat이고, 내 Next.js(App Router) + Supabase 프로젝트의 인증 구현 파트너야.
목표: Google OAuth 로그인/로그아웃 + 인증 상태 유지 + 보호된 페이지(또는 액션)까지 구현한다.

[확정된 요구사항]
- 로그인 방식: Google OAuth만 사용 (이메일/비번 로그인 코드 금지)
- 로그인 필요 기능: (예: `/mindtalk/new`, `/mypage/*`, 예약 신청 폼 제출)
- 로그인 후 이동: (예: `/mypage` 또는 `/mindtalk`)
- 로그아웃 후 이동: (예: `/`)

[환경]
- 로컬 URL: http://localhost:3000
- 배포 URL: (예: https://___vercel.app)
- Supabase 프로젝트가 아직 없다면: 먼저 프로젝트 생성 → URL/anon key 확보 → `.env.local` 설정까지 완료한 뒤 진행

[요구 출력]
1) Supabase 대시보드에서 설정해야 할 것 체크리스트(Authorized redirect URLs 포함)
2) Next.js 쪽에서 생성/수정할 파일 목록과 역할(경로 단위로: `/login`, `/signup`, 보호 라우팅)
3) 로그인/로그아웃 UI 최소 구현안(헤더 버튼 + 마이페이지 진입)
4) 인증 상태 확인(세션 유지) 테스트 시나리오 4개 + 실패 시 디버깅 힌트

주의: 내가 제공한 스택/요구사항 외의 라이브러리 도입은 하지 말고, 애매하면 질문해줘.
```

## 학습목표

1. 인증(Authentication)과 인가(Authorization)의 차이를 설명할 수 있다
2. OAuth 2.0 소셜 로그인의 동작 원리를 이해할 수 있다
3. Supabase로 Google 소셜 로그인을 구현할 수 있다
4. 인증 상태를 전역으로 관리하고 보호된 페이지를 만들 수 있다
5. 로그인/로그아웃 UI를 구현할 수 있다

---

## 수업 타임라인

**표 9.1** A회차 수업 타임라인

| 시간 | 내용 |
|------|------|
| 00:00~00:05 | 오늘의 미션 + 빠른 진단 |
| 00:05~00:25 | 인증 개념 + OAuth 흐름 |
| 00:25~00:45 | Google OAuth 설정 (Google Cloud Console + Supabase) |
| 00:45~01:20 | 라이브 코딩: 인증 구현 + AuthContext + 보호된 페이지 |
| 01:20~01:27 | 핵심 정리 + B회차 과제 스펙 공개 |
| 01:27~01:30 | Exit ticket |

---

## 오늘의 미션 + 빠른 진단

> **오늘의 질문**: "현재 게시판에 아무나 글을 쓸 수 있다. 어떻게 하면 '로그인한 사용자만' 글을 쓸 수 있게 만들 수 있을까?"

**빠른 진단** (1문항):

다음 중 인증(Authentication)과 인가(Authorization)를 올바르게 설명한 것은?
- (A) 인증은 "무엇을 할 수 있는가", 인가는 "누구인가"
- (B) 인증은 "누구인가", 인가는 "무엇을 할 수 있는가"
- (C) 인증과 인가는 같은 개념이다

정답: (B) — 인증은 신원 확인, 인가는 권한 확인이다.

---

## 9.1 인증의 기본 개념

Ch8에서 Supabase를 연결하고 테이블을 만들었다. 하지만 현재 상태에서는 누구든 데이터를 읽고 쓸 수 있다. **누가 이 요청을 보내는지** 확인하는 과정이 필요하다. 이것이 **인증**(Authentication)이다.

### 9.1.1 인증(Authentication) vs 인가(Authorization)

이 두 단어는 혼동하기 쉽지만 완전히 다른 개념이다:

**표 9.2** 인증 vs 인가

| 구분 | **인증**(Authentication) | **인가**(Authorization) |
|------|------------------------|----------------------|
| 질문 | "당신은 **누구**인가?" | "당신은 **무엇을 할 수 있는가**?" |
| 비유 | 건물 출입증 검사 | 층별 접근 권한 확인 |
| 시점 | 로그인할 때 | 요청할 때마다 |
| 이 수업에서 | Ch9 (이번 장) | Ch11 (RLS) |

쉽게 말해서, 인증은 "네가 홍길동이라는 것을 증명해"이고, 인가는 "홍길동은 이 게시글을 삭제할 수 있는가?"이다.

> **팁**: "출입증(인증)이 있어도 사장실(인가)에 들어갈 수 있는 건 아니다"라고 기억하면 쉽다.

### 9.1.2 세션과 토큰

로그인에 성공하면 서버는 "이 사용자가 인증되었다"는 증거를 클라이언트에게 전달해야 한다. Supabase는 **JWT**(JSON Web Token) 기반 인증을 사용하되, 쿠키에 저장하는 하이브리드 방식이다. `@supabase/ssr`이 이 쿠키 관리를 자동으로 처리한다.

핵심은 "로그인하면 브라우저에 토큰이 저장되고, 이후 요청마다 자동으로 보내진다"는 흐름이다.

### 9.1.3 OAuth 소셜 로그인의 흐름

이 수업에서는 Google 계정으로 로그인하는 **OAuth**(Open Authorization) 소셜 로그인을 구현한다. 직접 회원가입 폼(이메일+비밀번호)을 만들 수도 있지만, 소셜 로그인의 장점이 크다:

- **비밀번호를 관리할 필요 없다** (보안 부담 감소)
- **가입 절차가 간단하다** (클릭 한 번)
- **이메일 인증이 불필요하다** (Google이 이미 인증)

OAuth 소셜 로그인의 전체 흐름:

```text
① 사용자: "Google로 로그인" 버튼 클릭
② 앱 → Google: "이 사용자를 인증해주세요"
③ Google: 로그인 화면 표시 → 사용자가 계정 선택/동의
④ Google → 앱: "인증 완료, 여기 인증 코드입니다"
⑤ 앱 → Supabase: "이 인증 코드로 세션을 만들어주세요"
⑥ Supabase: JWT 발급 → 쿠키에 저장
⑦ 사용자: 로그인 완료! (이후 요청에 JWT 자동 포함)
```

> 이 복잡한 과정을 직접 구현하면 수백 줄의 코드가 필요하다. Supabase는 `signInWithOAuth()` **한 줄**로 이 모든 것을 처리한다.

---

## 9.2 Google OAuth 설정

OAuth 소셜 로그인을 구현하려면 **Google Cloud Console**과 **Supabase Dashboard** 양쪽에서 설정이 필요하다.

### 9.2.1 Google Cloud Console 설정

> **함께 진행**: 화면을 보며 함께 따라하자

① **Google Cloud Console** (https://console.cloud.google.com) 접속 → 기존 프로젝트 선택 또는 새 프로젝트 생성

② **APIs & Services** → **OAuth consent screen** 설정:
   - User Type: **External** 선택
   - App name: 프로젝트 이름 (예: "My Board")
   - User support email: 본인 이메일
   - Scopes: `email`, `profile` 추가
   - Test users: 본인 이메일 추가 (개발 중에는 테스트 사용자만 로그인 가능)

③ **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**:
   - Application type: **Web application**
   - Name: "Supabase Auth"
   - Authorized redirect URIs: **(아래 9.2.3에서 Supabase Callback URL을 여기에 입력)**


> **팁**: Google Cloud Console은 메뉴가 복잡하다. 아래 클릭 경로를 정확히 따라가자. 혼자 하면 길을 잃기 쉽다.

### 9.2.2 Supabase Auth Provider 설정

Supabase 대시보드에서 Google 로그인을 활성화한다:

① **Authentication** → **Providers** → **Google** 활성화

② Google Cloud Console에서 발급받은 **Client ID**와 **Client Secret**을 입력

③ 저장

**표 9.3** Supabase에 입력할 Google OAuth 정보

| 항목 | 어디서 가져오나 | 예시 |
|------|----------------|------|
| Client ID | Google Cloud Console → Credentials | `123456789.apps.googleusercontent.com` |
| Client Secret | Google Cloud Console → Credentials | `GOCSPX-abcdefghijk...` |

### 9.2.3 콜백 URL 등록

Supabase Authentication → Providers → Google 설정 화면에 **Callback URL**이 표시된다:

```text
https://[프로젝트ID].supabase.co/auth/v1/callback
```

이 URL을 **Google Cloud Console**의 **Authorized redirect URIs**에 등록해야 한다. 이 설정이 없으면 로그인 후 "redirect_uri_mismatch" 에러가 발생한다.

> **흔한 실수**: Callback URL을 복사할 때 앞뒤 공백이 포함되거나, `http://`로 잘못 입력하는 경우. 반드시 `https://`인지 확인한다.

---

## 9.3 인증 구현

> **라이브 코딩**: Google OAuth 설정부터 로그인/로그아웃 구현, AuthContext, 보호된 페이지까지 전 과정을 진행한다.

설정이 완료되었으면 코드를 작성한다. Supabase의 인증 함수는 3가지만 알면 된다.

### 9.3.1 signInWithOAuth

> **Copilot 프롬프트**
> "Supabase에서 Google OAuth로 로그인하는 함수를 만들어줘.
> @supabase/ssr의 createBrowserClient를 사용하고, 로그인 성공 후 /auth/callback으로 리다이렉트해줘."


나쁜 프롬프트와 비교해보자:

> **나쁜 프롬프트**
> "Supabase 로그인 기능 만들어줘"

이 프롬프트로는 이메일+비밀번호 방식인지, 소셜 로그인인지 AI가 알 수 없다. 어떤 Provider인지도 모른다. 결과적으로 이 수업에서 사용하지 않는 `signInWithPassword` 코드가 나올 가능성이 높다.

AI가 생성한 코드를 읽어보자:

```typescript
// lib/auth.ts
import { createClient } from "@/lib/supabase";

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
}
```

**코드 읽기 가이드**:

**표 9.4** signInWithOAuth 코드 해석

| 코드 | 의미 |
|------|------|
| `supabase.auth.signInWithOAuth()` | OAuth 방식으로 로그인 시작 |
| `provider: "google"` | Google을 인증 제공자로 지정 |
| `redirectTo` | 인증 완료 후 돌아올 URL |
| `window.location.origin` | 현재 사이트의 기본 URL (localhost:3000 또는 배포 URL) |
| `/auth/callback` | 인증 코드를 처리할 콜백 경로 |

`redirectTo`에 `window.location.origin`을 사용하면 로컬 개발(`localhost:3000`)과 배포 환경(Vercel URL) 모두에서 동작한다.

### 9.3.2 signOut

```typescript
// lib/auth.ts (이어서)
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}
```

로그아웃은 간단하다. `signOut()`을 호출하면 브라우저의 JWT 쿠키가 삭제되고 세션이 종료된다.

### 9.3.3 onAuthStateChange: 세션 상태 감지

사용자의 로그인 상태가 변할 때마다 알림을 받는 **리스너**(Listener)이다:

```javascript
const supabase = createClient();

supabase.auth.onAuthStateChange((event, session) => {
  console.log("인증 이벤트:", event);
  console.log("세션:", session);
});
```

**표 9.5** 주요 인증 이벤트

| 이벤트 | 발생 시점 |
|--------|----------|
| `SIGNED_IN` | 로그인 성공 |
| `SIGNED_OUT` | 로그아웃 |
| `TOKEN_REFRESHED` | 토큰 자동 갱신 |
| `USER_UPDATED` | 사용자 정보 변경 |

이 리스너를 활용하면 로그인/로그아웃에 따라 UI를 자동으로 업데이트할 수 있다. 다음 절(9.4)에서 이것을 Context로 감싸서 전역 상태로 만든다.

### 9.3.4 콜백 페이지 구현

OAuth 로그인 후 Supabase가 인증 코드를 보내면, 이를 처리하는 **콜백 페이지**가 필요하다:

> **Copilot 프롬프트**
> "Next.js App Router에서 Supabase OAuth 콜백을 처리하는 route handler를 만들어줘.
> 파일 경로: app/auth/callback/route.ts
> 인증 코드를 세션으로 교환하고, 성공하면 /dashboard로 리다이렉트해줘."


```typescript
// app/auth/callback/route.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  // 에러 시 홈으로 리다이렉트
  return NextResponse.redirect(`${origin}/?error=auth`);
}
```

**코드 읽기 가이드** — 이 코드의 핵심은 `exchangeCodeForSession(code)` 한 줄이다:

1. Google이 `?code=abc123` 형태로 인증 코드를 보낸다
2. `exchangeCodeForSession(code)`가 이 코드를 Supabase에 보내서 JWT로 교환한다
3. 성공하면 `/dashboard`로 이동, 실패하면 홈으로 돌아간다

> 이 파일은 **Route Handler**(서버에서만 실행)이므로 `createServerClient`를 사용한다. 브라우저 컴포넌트에서 사용하는 `createBrowserClient`와 구분한다.

---

## 9.4 인증 상태 관리

로그인 여부를 여러 컴포넌트에서 사용해야 한다. 네비게이션 바, 글 작성 버튼, 프로필 페이지 등 곳곳에서 "지금 로그인 상태인가?"를 확인한다. 이를 위해 **Context**로 인증 상태를 전역 관리한다.

### 9.4.1 AuthContext 구현

> **Copilot 프롬프트**
> "React Context를 사용한 Supabase 인증 상태 관리를 구현해줘.
> AuthProvider 컴포넌트와 useAuth 커스텀 Hook이 필요해.
> user 정보, loading 상태, signInWithGoogle, signOut 함수를 제공해줘.
> @supabase/ssr의 createBrowserClient를 사용해줘."


```tsx
// lib/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { signInWithGoogle, signOut } from "@/lib/auth";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // 현재 세션 확인
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // 세션 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

**코드 읽기 가이드**:

**표 9.6** AuthContext 코드 핵심 포인트

| 부분 | 역할 |
|------|------|
| `useState(null)` | 초기에는 사용자 정보 없음 |
| `useState(true)` | 처음에는 로딩 상태 (세션 확인 중) |
| `getUser()` | 페이지 로드 시 현재 로그인한 사용자 확인 |
| `onAuthStateChange` | 로그인/로그아웃 이벤트를 실시간 감지 |
| `session?.user ?? null` | 세션이 있으면 사용자 정보, 없으면 null |
| `subscription.unsubscribe()` | 컴포넌트 언마운트 시 리스너 정리 (메모리 누수 방지) |

이 AuthProvider를 앱의 최상위에 감싸면 모든 하위 컴포넌트에서 `useAuth()`로 인증 상태에 접근할 수 있다:

```tsx
// app/layout.tsx
import { AuthProvider } from "@/lib/auth-context";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 9.4.2 로그인/로그아웃 UI 흐름

이제 `useAuth()`를 사용해서 네비게이션 바에 로그인/로그아웃 버튼을 만든다:

```tsx
// components/navbar.tsx
"use client";

import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) return <nav className="p-4">로딩 중...</nav>;

  return (
    <nav className="flex justify-between items-center p-4 border-b border-border">
      <h1 className="text-xl font-bold">My Board</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.email}</span>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-muted rounded hover:bg-muted/80"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Google로 로그인
        </button>
      )}
    </nav>
  );
}
```

**코드 읽기 가이드** — 이 컴포넌트의 핵심은 **조건부 렌더링**이다:

- `loading`이 `true`면 → "로딩 중..." 표시
- `user`가 있으면 → 이메일 + 로그아웃 버튼
- `user`가 없으면 → 로그인 버튼

### 9.4.3 보호된 페이지 만들기 (미들웨어)

로그인하지 않은 사용자가 `/mypage`에 접근하면 로그인 페이지로 보내야 한다. Next.js의 **미들웨어**(Middleware)를 사용하면 서버 레벨에서 이를 강제할 수 있다.

> **Copilot 프롬프트**
> "Next.js 미들웨어에서 Supabase 인증 상태를 확인하고,
> 로그인하지 않은 사용자를 /login으로 리다이렉트하는 코드를 만들어줘.
> 보호할 경로: /mypage, /mindtalk/new
> @supabase/ssr의 createServerClient를 사용해줘."


```typescript
// middleware.ts (프로젝트 루트)
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/mypage/:path*", "/mindtalk/new"],
};
```

**코드 읽기 가이드**:

**표 9.7** 미들웨어 코드 핵심 포인트

| 부분 | 역할 |
|------|------|
| `middleware.ts` 위치 | 프로젝트 **루트** (app/ 아닌 최상위) |
| `createServerClient` | 서버 환경에서 Supabase 클라이언트 생성 |
| `getUser()` | 현재 요청의 사용자 정보 확인 |
| `if (!user)` | 비로그인 → 로그인 페이지로 리다이렉트 |
| `config.matcher` | 이 미들웨어가 실행될 경로 패턴 (보호된 경로만) |

> **미들웨어**(Middleware)란 요청이 페이지에 도달하기 **전에** 실행되는 코드이다. 보안 검사, 리다이렉트, 헤더 수정 등을 여기서 처리한다. 클라이언트 코드(React 컴포넌트)에서 체크하는 것보다 안전하다.

---

## 핵심 정리 + B회차 과제 스펙

### 이번 시간 핵심 3가지

1. **인증**은 "누구인가?", **인가**는 "무엇을 할 수 있는가?" — 인증은 Ch9, 인가는 Ch11에서 다룬다
2. **OAuth 소셜 로그인**: `signInWithOAuth({ provider: "google" })` 한 줄로 Google 로그인이 시작된다
3. **AuthContext**: React Context로 인증 상태를 전역 관리하고, `useAuth()` Hook으로 어디서든 사용한다

### B회차 과제 스펙

**Google 로그인 구현 + 배포**:
1. Google Cloud Console OAuth 설정 완료
2. Supabase Auth Provider(Google) 설정 완료
3. `lib/auth.ts` — signInWithGoogle, signOut 구현
4. `app/auth/callback/route.ts` — 콜백 처리
5. `lib/auth-context.tsx` — AuthProvider + useAuth
6. `components/navbar.tsx` — 로그인/로그아웃 UI
7. Google 로그인 → 로그아웃 → 재로그인 테스트 성공

**스타터 코드**: `practice/chapter9/starter/` — Ch8 complete 기반에 인증 관련 파일 뼈대(TODO 주석)가 추가되어 있다.

---

## Exit ticket

다음 코드에서 잘못된 부분을 찾아라:

```javascript
export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  return { data, error };
}
```

정답: `redirectTo`에 `http://localhost:3000`이 하드코딩되어 있다. 배포 환경(Vercel)에서는 동작하지 않는다. `window.location.origin + "/auth/callback"`을 사용해야 로컬과 배포 환경 모두에서 동작한다.

---

## 학습 체크리스트

**수업 전 준비**:
- [ ] Google Cloud Console 접속 확인 (https://console.cloud.google.com)
- [ ] Supabase 프로젝트 대시보드 접속 확인
- [ ] 테스트 사용자 등록 안내 확인 (OAuth 앱이 "Testing" 상태일 때)

**자기 점검**:
- [ ] 인증 vs 인가 차이를 이해했는가
- [ ] OAuth 흐름 (사용자 → Google → Supabase → JWT)을 이해했는가
- [ ] signInWithOAuth, signOut, onAuthStateChange 역할을 이해했는가
- [ ] 콜백 Route Handler의 역할을 이해했는가
