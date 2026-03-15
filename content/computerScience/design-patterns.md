---
title: "디자인 패턴 개요 — GoF 23가지"
date: "2026-03-11"
category: "computerScience"
tags: ["design-patterns", "oop", "architecture", "gof", "software-engineering"]
excerpt: "Gang of Four의 23가지 디자인 패턴을 생성/구조/행동 패턴으로 분류하여 정리합니다."
difficulty: "intermediate"
studyDuration: 90
---

## 디자인 패턴이란?

소프트웨어 설계에서 반복적으로 등장하는 문제의 **검증된 해결책**입니다.

## 3가지 분류

### 생성 패턴 (Creational)

객체 생성 방식을 추상화합니다.

| 패턴 | 목적 |
|------|------|
| Singleton | 인스턴스 하나만 보장 |
| Factory Method | 서브클래스가 객체 생성 결정 |
| Builder | 복잡한 객체를 단계적으로 생성 |

### 구조 패턴 (Structural)

클래스/객체 조합 구조를 다룹니다.

| 패턴 | 목적 |
|------|------|
| Adapter | 인터페이스 변환 |
| Decorator | 기능을 동적으로 추가 |
| Proxy | 접근 제어 및 대리 |

### 행동 패턴 (Behavioral)

객체 간의 소통과 책임 분배를 다룹니다.

| 패턴 | 목적 |
|------|------|
| Observer | 상태 변화를 구독자에게 통보 |
| Strategy | 알고리즘을 캡슐화하여 교체 가능 |
| Command | 요청을 객체로 캡슐화 |

## OOP와의 관계

디자인 패턴은 OOP 원칙(캡슐화, 다형성 등)을 실전에 적용하는 방법입니다.
