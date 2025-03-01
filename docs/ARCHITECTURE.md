# Hono Routing Controller - Architecture

## 📌 Overview
This package provides a **NestJS-like controller architecture** for the [Hono](https://hono.dev/) framework. It enables **decorator-based routing, middleware support, and dependency injection**, making it easier to organize and manage routes in Hono.

---

## 🏗️ Design Principles
- **Decorator-Based Routing** → Define routes using class decorators.
- **Middleware Integration** → Use middleware with controllers.
- **Dependency Injection (DI)** → Inject dependencies into controllers.
- **TypeScript First** → Fully typed API with TypeScript.
- **Lightweight & Fast** → Minimal runtime overhead.

---

## 📂 Directory Structure

```
hono-routing-controller/
│── src/
│   ├── decorators/        # Custom decorators for routes and middleware
│   │   ├── Controller.ts
│   │   ├── HttpMethods.ts
│   │
│   ├── core/              # Core logic for routing and DI
│   │   ├── DIContainer.ts
|   |
│   ├── types/             # Type definitions
│   │   ├── index.ts
│   │
│   ├── constants.ts       # Constants used in the package
│   ├── index.ts           # Entry point for package exports
│
├── tests/                 # Unit and integration tests
├── package.json
├── tsup.config.ts
└── tsconfig.json
```
---

## 🛠️ Components

### **1️⃣ Decorators**
These are used to define controllers, routes, and middleware.

- `@Controller(path: string)`: Defines a controller with a base path.
- `@Get(path: string)`: Defines a `GET` route.
- `@Post(path: string)`: Defines a `POST` route.
- `@Middleware(middlewareFn)`: Attaches middleware to a route.

## 🚀 How It Works
1. Define Controllers & Routes → Use decorators.
2. Register Controllers → The package scans and registers controllers.
3. Handle Requests → Routes are automatically wired in Hono.
4. Use Dependency Injection → Inject services into controllers.

## 🙌 Contributing
We welcome contributions! Please check the CONTRIBUTING.md for guidelines.