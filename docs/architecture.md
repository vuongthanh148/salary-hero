# Architecture

---

## Table of Contents <!-- omit in toc -->

- [Hexagonal Architecture](#hexagonal-architecture)
- [Project folder structure](#project-folder-structure)

---

## Hexagonal Architecture

This application is based on [Hexagonal Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>). This architecture is also known as Ports and Adapters.

![Hexagonal Architecture Diagram](https://github.com/brocoders/nestjs-boilerplate/assets/6001723/6a6a763e-d1c9-43cc-910a-617cda3a71db)

The main reason for using Hexagonal Architecture is to separate the business logic from the infrastructure. This separation allows us to easily change the database, the way of uploading files, or any other infrastructure without changing the business logic.

---

## Project folder structure

```bash
src
├── app.module.ts
├── config
├── database
│   ├── config
│   ├── data-source.ts
│   ├── migrations
│   ├── seeds
│   └── typeorm-config.service.ts
├── main.ts
├── modules
│   ├── employee
│   │   ├── controllers
│   │   ├── domain
│   │   ├── dtos
│   │   ├── employee.module.ts
│   │   ├── infrastructure
│   │   ├── mappers
│   │   └── services
│   ├── manager
│   │   ├── controllers
│   │   ├── manager.module.ts
│   │   └── services
│   └── scheduler
│       ├── scheduler.module.ts
│       └── services
└── utils
```

---

Previous: [Installing and Running](installing-and-running.md)

Next: [Working with database](database.md)
