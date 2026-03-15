# sjk_lablog

개인 학습 기록 블로그. 언어, 컴퓨터 과학, 프레임워크 학습을 기록하고 생각을 구조화하는 실험 공간.

## 기술 스택

- **Next.js 15** App Router + TypeScript
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **MDX** (`next-mdx-remote/rsc`) — 마크다운 기반 콘텐츠
- **react-force-graph-2d** — 태그 네트워크 시각화
- **Vercel Analytics** + Speed Insights

## 시작하기

```bash
npm install
npm run dev
```

## 포스트 작성

`content/[category]/slug.md` 파일을 생성합니다.

```yaml
---
title: "제목"
date: "2026-03-15"
category: "framework"       # english | spanish | computerScience | framework
tags: ["nextjs", "react"]
excerpt: "한 줄 요약"
difficulty: "intermediate"  # optional
studyDuration: 45           # optional: 공부 시간(분)
---
```

## 스크립트

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run type-check   # TypeScript 검사
npm run lint         # ESLint
```

## 배포

Vercel + GitHub Actions CI
