import { MigrationInterface, QueryRunner } from 'typeorm';

export class Staff1745253947860 implements MigrationInterface {
  name = 'Staff1745253947860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" RENAME COLUMN "id" TO "staffId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" RENAME CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" TO "PK_a455629d6ffbd1f2953f453f3f9"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" RENAME CONSTRAINT "PK_a455629d6ffbd1f2953f453f3f9" TO "PK_e4ee98bb552756c180aec1e854a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" RENAME COLUMN "staffId" TO "id"`,
    );
  }
}
