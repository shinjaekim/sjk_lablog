# sjk_lablog — Claude Code Reference

개인 학습 기록 블로그. Next.js 15 App Router + TypeScript + Tailwind CSS v4.

## 핵심 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run type-check   # tsc --noEmit
npm run lint         # next lint
```

## 프로젝트 구조

```
content/             # 마크다운 포스트 (여기에 글 추가)
│  ├── english/
│  ├── spanish/
│  ├── computerScience/
│  └── framework/
src/
├── app/
│   ├── (blog)/      # 카테고리 페이지 (공통 사이드바 레이아웃)
│   ├── tags/        # Knowledge Map (태그 네트워크 그래프)
│   ├── stats/       # 학습 통계 대시보드
│   └── about/
├── components/
│   ├── graph/       # TagGraph (react-force-graph-2d, client only)
│   ├── layout/      # Header, Footer, MobileMenu
│   ├── post/        # PostCard, PostList, PostHeader, MDXContent, TagBadge
│   ├── stats/       # StudyCalendar (GitHub 스타일 히트맵)
│   └── ui/          # Badge, ThemeToggle
└── lib/
    ├── data/        # 데이터 계층 (핵심)
    │   ├── types.ts              # 모든 타입 정의
    │   ├── repository.ts         # IPostRepository 인터페이스
    │   ├── markdown-repository.ts # 현재 구현체 (파일시스템)
    │   └── index.ts              # ← DB 전환 시 여기만 수정
    └── utils/       # cn, date, slug, reading-time
```

## 데이터 계층 — 가장 중요한 설계

모든 페이지는 `@/lib/data`에서만 데이터를 가져온다. 직접 파일 I/O나 `markdown-repository.ts`를 import하지 않는다.

```typescript
import { getAllPosts, getPostBySlug, getTagGraphData } from '@/lib/data'
```

**DB 전환 방법**: `src/lib/data/index.ts`에서 import 소스만 바꾸면 끝.

## 포스트 작성 규칙

`content/[category]/slug.md` 파일 생성. 파일명이 URL slug가 된다.

```yaml
---
title: "제목"
date: "2026-03-15"        # ISO 8601 필수
category: "framework"     # CATEGORIES 상수 중 하나
tags: ["nextjs", "react"] # 태그 네트워크에 자동 반영
excerpt: "한 줄 요약"
difficulty: "beginner"    # optional: beginner | intermediate | advanced
studyDuration: 45         # optional: 공부 시간(분) → Stats 히트맵에 반영
---
```

## 카테고리 추가 방법

1. `src/lib/data/types.ts` — `CATEGORIES` 배열과 `CATEGORY_LABELS`에 추가
2. `src/app/(blog)/[새카테고리]/page.tsx` 생성
3. `src/app/(blog)/[새카테고리]/[slug]/page.tsx` 생성
4. `content/[새카테고리]/` 폴더 생성

## 기술 결정 사항

| 결정 | 이유 |
|------|------|
| `next-mdx-remote/rsc` 사용 | `@next/mdx`는 Turbopack 직렬화 오류 발생 |
| `data-theme` attribute | FOUC 없는 다크모드 (`<html>` 태그에 설정) |
| `dynamicParams = false` | 정의되지 않은 slug → 404 (SSG 완전 정적화) |
| `React.cache()` in repository | 같은 요청 내 중복 파일 I/O 방지 |
| `server-only` in data layer | 클라이언트 사이드 import 방지 |

## 배포

- **Vercel**: GitHub 연동, `main` push → 자동 배포, PR → Preview URL 자동 생성
- **CI**: `.github/workflows/ci.yml` — PR 시 type-check + lint + build 실행
