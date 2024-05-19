# Work with database

---

## Table of Contents <!-- omit in toc -->

- [Entities](#entities)
  - [Employee](#employee)
- [Working with database schema (TypeORM)](#working-with-database-schema-typeorm)
  - [Generate migration](#generate-migration)
  - [Run migration](#run-migration)
  - [Revert migration](#revert-migration)
  - [Drop all tables in database](#drop-all-tables-in-database)
- [Seeding (TypeORM)](#seeding-typeorm)
  - [Factory and Faker (TypeORM)](#factory-and-faker-typeorm)
  - [Seed file (TypeORM)](#seed-file-typeorm)
  - [Run seed (TypeORM)](#run-seed-typeorm)

---

## Entities

### Employee

```ts
@Entity({
  name: 'employee',
})
export class EmployeeEntity {
  @ApiResponseProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'Stephen',
  })
  @Column({ type: String, unique: false, nullable: false })
  @Index()
  name: string;

  @ApiResponseProperty({
    type: Number,
    example: 1000,
  })
  @Column({ type: 'real', unique: false, nullable: false })
  balance: number;

  @ApiResponseProperty({
    type: Number,
    example: 10,
  })
  @Column({ type: Number, unique: false, nullable: false })
  workDay: number;

  @ApiResponseProperty({
    type: String,
    example: WorkType.Monthly,
  })
  @Column({ type: 'enum', enum: WorkType, unique: false, nullable: false })
  @Index()
  workType: string;

  @ApiResponseProperty({
    type: Number,
    example: 10000.5,
  })
  @Column({ type: 'real', unique: false, nullable: false })
  salary: number;

  @ApiResponseProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiResponseProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
```

## Working with database schema (TypeORM)

### Generate migration

1. Create entity file with extension `.entity.ts`. For example `post.entity.ts`:

   ```ts
   // src/modules/employee/infrastructure/entities/employee.entity.ts

   import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

   @Entity()
   export class EmployeeEntity {
     @ApiResponseProperty({
       type: String,
     })
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @ApiResponseProperty({
       type: String,
       example: 'Stephen',
     })
     @Column({ type: String, unique: false, nullable: false })
     name: string;

     // Here any fields that you need
   }
   ```

1. Next, generate migration file:

   ```bash
   npm run migration:generate -- src/database/migrations/create-table-employee
   ```

1. Apply this migration to database via [npm run migration:run](#run-migration).

### Run migration

```bash
npm run migration:run
```

### Revert migration

```bash
npm run migration:revert
```

### Drop all tables in database

```bash
npm run schema:drop
```

---

## Seeding (TypeORM)

### Factory and Faker (TypeORM)

1. Install faker:

   ```bash
   npm i --save-dev @faker-js/faker
   ```

1. Create `src/database/seeds/employee/factories/employee.factory.ts`:

   ```ts
   import { faker } from '@faker-js/faker';
   import {
     EmployeeEntity,
     WorkType,
   } from '../../../../modules/employee/infrastructure/entities/employee.entity';

   export function createRandomEmployee(): EmployeeEntity {
     const employee = new EmployeeEntity();
     employee.name = faker.internet.userName();
     employee.salary = faker.number.float({ min: 1000, max: 30000 });
     employee.workDay = faker.number.int({ max: 31, min: 1 });
     employee.workType = faker.helpers.enumValue(WorkType);
     employee.balance = faker.number.float();
     return employee;
   }

   export const EMPLOYEE_LIST: EmployeeEntity[] = faker.helpers.multiple(
     createRandomEmployee,
     {
       count: 148,
     },
   );
   ```

---

### Seed file (TypeORM)

1. Go to `src/database/seeds/employee/employee-seed.service.ts`.

   ```ts
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';

   import { Repository } from 'typeorm';
   import { EmployeeEntity } from '../../../modules/employee/infrastructure/entities/employee.entity';
   import { EMPLOYEE_LIST } from './factories/employee.factory';

   @Injectable()
   export class EmployeeSeedService {
     constructor(
       @InjectRepository(EmployeeEntity)
       private repository: Repository<EmployeeEntity>,
     ) {}

     async run() {
       const count = await this.repository.count({});

       if (!count) {
         await this.repository.save(this.repository.create(EMPLOYEE_LIST));
       }
     }
   }
   ```

1. In `run` method contains logic to seed data.
1. Run [npm run seed:run](#run-seed-typeorm)

### Run seed (TypeORM)

```bash
npm run seed:run
```

Previous: [Architecture](architecture.md)

Next: [Serialization](serialization.md)
