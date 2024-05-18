import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDataType1716036444029 implements MigrationInterface {
  name = 'UpdateDataType1716036444029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "balance"`);
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "balance" real NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "salary"`);
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "salary" real NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "salary"`);
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "salary" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "balance"`);
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "balance" integer NOT NULL`,
    );
  }
}
