---
title: "Next.js App Router 핵심 정리"
date: "2026-03-15"
category: "framework"
tags: ["nextjs", "app-router", "react", "typescript", "ssr"]
excerpt: "Next.js 15 App Router의 핵심 개념인 Server Components, 라우팅, 데이터 페칭을 정리합니다."
difficulty: "intermediate"
studyDuration: 60
---

## App Router란?

Next.js 13+에서 도입된 **App Router**는 React Server Components(RSC)를 기반으로 동작합니다.
기존 Pages Router와 달리 `app/` 디렉터리를 사용하며, 파일 시스템 기반 라우팅을 제공합니다.

## Server Components vs Client Components

| 구분 | Server Component | Client Component |
|------|-----------------|-----------------|
| 렌더링 | 서버 | 브라우저 |
| JS 번들 | 포함 안됨 | 포함됨 |
| 데이터 페칭 | async/await 직접 | useEffect, SWR |
| 상태 | 없음 | useState, useReducer |

`'use client'` 지시어가 없으면 기본적으로 **Server Component**입니다.

## 라우팅 규칙

```
app/
├── page.tsx          → /
├── about/
│   └── page.tsx      → /about
├── blog/
│   ├── page.tsx      → /blog
│   └── [slug]/
│       └── page.tsx  → /blog/:slug
└── (group)/          → URL에 영향 없는 그룹
    └── layout.tsx
```

## 데이터 페칭

```typescript
// Server Component에서 직접 async/await
export default async function Page() {
  const data = await fetch('https://api.example.com/posts')
  const posts = await data.json()
  return <PostList posts={posts} />
}
```

## generateStaticParams

정적 생성(SSG)을 위한 파라미터 생성:

```typescript
export async function generateStaticParams() {
  return [{ slug: 'hello' }, { slug: 'world' }]
}

export const dynamicParams = false // 정의되지 않은 경로 → 404
```

## 핵심 정리

- **기본값은 SSG** — 서버에서 빌드 타임에 렌더링
- **`'use client'`은 최소화** — 상호작용이 필요한 리프 노드에만 사용
- **`React.cache()`** — 같은 요청 내에서 중복 DB 쿼리 방지
