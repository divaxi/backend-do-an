import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1746245282100 implements MigrationInterface {
  name = 'CreatePostTable1746245282100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "note" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "active" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "endTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "startTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "staffId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_f7ea080dcc6c08d60b48f620180" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_f7ea080dcc6c08d60b48f620180"`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "staffId"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "startTime"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "endTime"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "active"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "note"`);
  }
}
