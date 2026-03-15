---
title: "Java OOP 4대 원칙"
date: "2026-03-08"
category: "programming"
tags: ["java", "oop", "design-patterns", "encapsulation", "inheritance"]
excerpt: "객체지향 프로그래밍의 4대 원칙(캡슐화, 상속, 다형성, 추상화)을 Java 코드로 정리합니다."
difficulty: "beginner"
studyDuration: 50
---

## 1. 캡슐화 (Encapsulation)

```java
public class BankAccount {
    private double balance;  // private으로 은닉

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

## 2. 상속 (Inheritance)

```java
public class Animal {
    public void speak() { System.out.println("..."); }
}

public class Dog extends Animal {
    @Override
    public void speak() { System.out.println("Woof!"); }
}
```

## 3. 다형성 (Polymorphism)

```java
Animal a = new Dog();
a.speak();  // "Woof!" — 런타임에 실제 타입 결정
```

## 4. 추상화 (Abstraction)

```java
public interface Shape {
    double area();
}

public class Circle implements Shape {
    private double r;
    public Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}
```

## SOLID 원칙과의 연결

OOP 4대 원칙 → SOLID → 디자인 패턴 순으로 학습하면 좋다.
