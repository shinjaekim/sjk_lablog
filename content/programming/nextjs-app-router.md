---
title: "Next.js App Router 핵심 정리"
date: "2026-03-15"
category: "programming"
tags: ["nextjs", "react", "typescript", "ssr", "web"]
excerpt: "Next.js 15 App Router의 핵심 개념인 Server Components, 라우팅, 데이터 페칭을 정리합니다."
difficulty: "intermediate"
studyDuration: 60
---

## App Router란?

Next.js 13+에서 도입된 **App Router**는 React Server Components(RSC)를 기반으로 동작합니다.

## Server Components vs Client Components

| 구분 | Server Component | Client Component |
|------|-----------------|-----------------|
| 렌더링 | 서버 | 브라우저 |
| JS 번들 | 포함 안됨 | 포함됨 |
| 데이터 페칭 | async/await 직접 | useEffect, SWR |

`'use client'` 지시어가 없으면 기본적으로 **Server Component**입니다.

## 라우팅 규칙

```
app/
├── page.tsx          → /
├── [slug]/
│   └── page.tsx      → /:slug
└── (group)/          → URL에 영향 없는 그룹
    └── layout.tsx
```

## generateStaticParams

```typescript
export async function generateStaticParams() {
  return [{ slug: 'hello' }, { slug: 'world' }]
}
export const dynamicParams = false
```

## 핵심 정리

- **기본값은 SSG** — 빌드 타임 렌더링
- **`'use client'`은 최소화** — 리프 노드에만 사용
- **`React.cache()`** — 중복 쿼리 방지
