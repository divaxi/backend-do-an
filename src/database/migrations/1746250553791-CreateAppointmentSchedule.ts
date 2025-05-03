import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppointmentSchedule1746250553791
  implements MigrationInterface
{
  name = 'CreateAppointmentSchedule1746250553791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointment_schedule" ("specificTime" TIMESTAMP NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "appointmentId" uuid NOT NULL, "scheduleId" uuid NOT NULL, CONSTRAINT "PK_1dd29956529ee1c9cf4a055312f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_schedule" ADD CONSTRAINT "FK_bdbf7bea8135e8901c33f4ee0d1" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_schedule" ADD CONSTRAINT "FK_5a1fec32bd4e0e92f8cf18649c5" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment_schedule" DROP CONSTRAINT "FK_5a1fec32bd4e0e92f8cf18649c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_schedule" DROP CONSTRAINT "FK_bdbf7bea8135e8901c33f4ee0d1"`,
    );
    await queryRunner.query(`DROP TABLE "appointment_schedule"`);
  }
}
