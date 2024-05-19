# Installation

---

## Table of Contents <!-- omit in toc -->

- [Installing and Running](#installing-and-running)
- [Links](#links)

---

## Installing and Running

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/vuongthanh148/salary-hero.git salary-hero
   ```

1. Go to folder, and copy `.env.example` as `.env`.

   ```bash
   cd my-app/
   cp .env.example .env
   ```

1. Run additional container:

   ```bash
   docker compose up -d postgres adminer
   ```

1. Install dependency

   ```bash
   npm install
   ```

1. Run migrations

   ```bash
   npm run migration:run
   ```

1. Run seeds

   ```bash
   npm run seed:run
   ```

1. Run app in dev mode

   ```bash
   npm run start:dev
   ```

1. Open <http://localhost:3000>

## Links

- Swagger (API docs): <http://localhost:3000/docs>
- Adminer (client for DB): <http://localhost:8080>

---

Previous: [Introduction](introduction.md)

Next: [Architecture](architecture.md)
