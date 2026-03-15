---
title: "Big-O 표기법 완벽 정리"
date: "2026-03-10"
category: "computerScience"
tags: ["algorithms", "big-o", "complexity", "data-structures"]
excerpt: "시간 복잡도와 공간 복잡도를 Big-O 표기법으로 분석하는 방법을 정리합니다."
difficulty: "beginner"
studyDuration: 45
---

## Big-O 표기법이란?

알고리즘의 **최악의 경우 성능**을 나타내는 수학적 표기법입니다.
입력 크기 `n`에 대해 실행 시간이 어떻게 증가하는지 표현합니다.

## 복잡도 차트 (빠른 순)

| 표기 | 이름 | 예시 |
|------|------|------|
| O(1) | 상수 | 배열 인덱스 접근 |
| O(log n) | 로그 | 이진 탐색 |
| O(n) | 선형 | 선형 탐색 |
| O(n log n) | 선형로그 | 합병 정렬 |
| O(n²) | 이차 | 버블 정렬 |
| O(2ⁿ) | 지수 | 피보나치 재귀 |

## 실전 예시

### O(1) — 상수 시간

```javascript
function getFirst(arr) {
  return arr[0] // 배열 크기와 무관하게 항상 1번 연산
}
```

### O(n) — 선형 시간

```javascript
function findMax(arr) {
  let max = arr[0]
  for (const val of arr) { // n번 반복
    if (val > max) max = val
  }
  return max
}
```

### O(n²) — 이차 시간

```javascript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {     // n번
    for (let j = 0; j < arr.length; j++) {   // n번
      // n * n = n²
    }
  }
}
```

## 핵심 규칙

1. **상수 무시**: O(2n) → O(n)
2. **낮은 차수 무시**: O(n² + n) → O(n²)
3. **최악의 경우 기준**: 평균이 아닌 최악을 분석
