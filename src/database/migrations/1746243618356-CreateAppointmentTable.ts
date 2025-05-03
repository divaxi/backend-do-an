import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppointmentTable1746243618356 implements MigrationInterface {
  name = 'CreateAppointmentTable1746243618356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "active" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "note" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "customerRecordId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_e84b6c9d3d9423add390d6b8ee9" FOREIGN KEY ("customerRecordId") REFERENCES "customer_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_e84b6c9d3d9423add390d6b8ee9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP COLUMN "customerRecordId"`,
    );
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "note"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "active"`);
  }
}
