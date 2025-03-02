# Hono Routing Controllers

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A TypeScript-based decorator-driven routing solution for Hono.js, inspired by `routing-controllers`, featuring dependency injection and middleware support.

> **Warning**  
> ⚠️ This project is currently under active development and **not production-ready**.  
> Expect breaking changes and missing features. Use at your own risk!

---

## 🚨 Important Notice

**This is experimental software** - not recommended for production use.  
Current status: **Proof of Concept** stage. Core functionality is being validated.

## Features

- 🎯 Decorator-based route definitions (`@Controller`, `@Get`, `@Post`, etc.)
- 💉 Custom dependency injection container
- 🛡️ Middleware support
- 📜 TypeScript-first approach
- 🔌 External Hono instance integration

## Installation

1. Install the package:
```bash
pnpm install hono-routing-controllers
```

1. Install required peer dependencies:
```bash
pnpm install hono reflect-metadata
```

3. Add `reflect-metadata` import at the entry point of your application:
```typescript
import 'reflect-metadata';
```

4. Its important to set these options in `tsconfig.json` file of your project:
```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

# 🚀 Quick Start

### 1. Create Controller

```typescript
import { Controller, Get } from 'hono-routing-controllers';
import { Context } from 'hono';

@Controller('/users')
export class UserController {
    @Get('/')
    findAll(c: Context) {
        return c.json([{ id: 1, name: 'John' }]);
    }
}
```

### 2. Initialize

```typescript
import { Hono } from 'hono';
import { useRoutingController } from 'hono-routing-controllers';
import { UserController } from './controllers/UserController';

const app = new Hono();

useRoutingController(app, {
    controllers: [UserController]
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

## 📚 API Reference
### 🎨 Decorators

| Decorator   | Parameters       | Description            |
|-------------|------------------|------------------------|
| @Controller | path: string     | Class route prefix     |
| @Get        | path: string     | GET route handler      |
| @Post       | path: string     | POST route handler     |
| @Put        | path: string     | PUT route handler      |
| @Delete     | path: string     | DELETE route handler   |
| @UseBefore  | ...middlewares   | Apply middleware(s)    |

### ⚙ Configuration

```typescript
useRoutingController(
  app: Hono, 
  options: {
    controllers: Array<new () => any>
  }
)
```

### � Development

```bash
pnpm run dev
pnpm run build
pnpm run test
```

## 🛑 Current Limitations
- ❌ Missing comprehensive test coverage
- ❌ API surface may change dramatically
- ❌ Documentation is incomplete
- ❌ Not security audited
- ❌ Performance not optimized

## 🧪 Development Goals
| Status | Feature                  |
|--------|--------------------------|
| ✅ Done | Basic routing            |
| 🟡 Partial | Middleware support    |
| 🚧 WIP | Dependency injection      |
| ❌ Todo | Error handling           |
| ❌ Todo | Validation decorators    |

# 🤝 Contributing
### Fork the repository

1. Create your feature branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```

2. Commit your changes:
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```

3. Push to the branch:
    ```bash
    git push origin feature/AmazingFeature
    ```

4. Open a Pull Request

## 📅 Roadmap
- Stable core API 
- Full test coverage 
- Production readiness

> **Experimental Use Only**  
> This package is shared for early feedback and collaborative development.  
> Not suitable for mission-critical applications. Breaking changes may occur without notice.

# 📄 License
MIT © Hasibur Rahman