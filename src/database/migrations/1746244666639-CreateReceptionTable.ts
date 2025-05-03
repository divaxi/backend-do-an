import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReceptionTable1746244666639 implements MigrationInterface {
  name = 'CreateReceptionTable1746244666639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reception" ADD "note" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" ADD "checkinTime" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" ADD "appointmentId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" ADD CONSTRAINT "UQ_0f2ca2d67c1255427aabab5ea2f" UNIQUE ("appointmentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" ADD CONSTRAINT "FK_0f2ca2d67c1255427aabab5ea2f" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reception" DROP CONSTRAINT "FK_0f2ca2d67c1255427aabab5ea2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" DROP CONSTRAINT "UQ_0f2ca2d67c1255427aabab5ea2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" DROP COLUMN "appointmentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" DROP COLUMN "checkinTime"`,
    );
    await queryRunner.query(`ALTER TABLE "reception" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "reception" DROP COLUMN "note"`);
  }
}
