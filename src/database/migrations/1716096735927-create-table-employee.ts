import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableEmployee1716096735927 implements MigrationInterface {
  name = 'CreateTableEmployee1716096735927';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "balance" real NOT NULL, "workDay" integer NOT NULL, "workType" "public"."employee_worktype_enum" NOT NULL, "salary" real NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e97a7f3c48c04b54ffc24e5fc7" ON "employee" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_99e36df8d1f79b99448e587f38" ON "employee" ("workType") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99e36df8d1f79b99448e587f38"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e97a7f3c48c04b54ffc24e5fc7"`,
    );
    await queryRunner.query(`DROP TABLE "employee"`);
  }
}
