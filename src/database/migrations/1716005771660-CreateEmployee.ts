import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployee1716005771660 implements MigrationInterface {
  name = 'CreateEmployee1716005771660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."employee_worktype_enum" AS ENUM('monthly', 'daily')`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "balance" integer NOT NULL, "workDay" integer NOT NULL, "workType" "public"."employee_worktype_enum" NOT NULL, "salary" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(`DROP TYPE "public"."employee_worktype_enum"`);
  }
}
