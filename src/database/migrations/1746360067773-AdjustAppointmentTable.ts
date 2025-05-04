import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustAppointmentTable1746360067773 implements MigrationInterface {
  name = 'AdjustAppointmentTable1746360067773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "staffId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ALTER COLUMN "active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ALTER COLUMN "active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_9c1066af3b6cc0f8c54de747b07" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_9c1066af3b6cc0f8c54de747b07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "active" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ALTER COLUMN "active" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ALTER COLUMN "active" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "staffId"`);
  }
}
