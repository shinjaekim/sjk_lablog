---
title: "JavaScript 클로저 완벽 이해"
date: "2026-03-12"
category: "programming"
tags: ["javascript", "closures", "functional", "scope", "web"]
excerpt: "클로저의 개념과 실전 활용 패턴을 예제 중심으로 정리합니다."
difficulty: "intermediate"
studyDuration: 45
---

## 클로저란?

**클로저**는 함수가 선언된 렉시컬 환경을 기억하는 함수입니다.

```javascript
function makeCounter() {
  let count = 0
  return function () {
    return ++count
  }
}

const counter = makeCounter()
counter() // 1
counter() // 2
```

`counter`는 `makeCounter`의 실행이 끝난 후에도 `count`에 접근합니다.

## 실전 활용 패턴

### 1. 데이터 은닉

```javascript
function createUser(name) {
  let _name = name  // private
  return {
    getName: () => _name,
    setName: (n) => { _name = n },
  }
}
```

### 2. 함수 팩토리

```javascript
const multiply = (x) => (y) => x * y
const double = multiply(2)
double(5) // 10
```

### 3. 메모이제이션

```javascript
function memoize(fn) {
  const cache = new Map()
  return (n) => {
    if (cache.has(n)) return cache.get(n)
    const result = fn(n)
    cache.set(n, result)
    return result
  }
}
```

## 주의사항

루프에서 클로저를 사용할 때 `var` 대신 `let` 사용 필수.
