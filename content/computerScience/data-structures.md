---
title: "핵심 자료구조 비교 정리"
date: "2026-03-09"
category: "computerScience"
tags: ["data-structures", "algorithms", "array", "linked-list", "tree", "graph"]
excerpt: "배열, 연결리스트, 스택, 큐, 트리, 그래프의 특성과 시간복잡도를 비교합니다."
difficulty: "beginner"
studyDuration: 60
---

## 선형 자료구조

### Array vs Linked List

| 연산 | Array | Linked List |
|------|-------|-------------|
| 접근 | O(1) | O(n) |
| 삽입 (앞) | O(n) | O(1) |
| 삽입 (뒤) | O(1)* | O(n) |
| 삽입 (중간) | O(n) | O(n) |

### Stack & Queue

```
Stack (LIFO): push / pop → DFS, 함수 호출 스택
Queue (FIFO): enqueue / dequeue → BFS, 작업 큐
```

## 비선형 자료구조

### Tree

```
        1
       / \
      2   3
     / \
    4   5
```

- **BST**: 왼쪽 < 루트 < 오른쪽, 탐색 O(log n)
- **Heap**: 최댓값/최솟값 O(1) 접근, 우선순위 큐

### Graph

- **인접 행렬**: 공간 O(V²), 엣지 확인 O(1)
- **인접 리스트**: 공간 O(V+E), 엣지 확인 O(degree)

## 선택 기준

- 빠른 접근이 중요 → Array
- 잦은 삽입/삭제 → Linked List
- 계층 구조 → Tree
- 관계 모델링 → Graph
