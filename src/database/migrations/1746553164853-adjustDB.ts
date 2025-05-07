import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustDB1746553164853 implements MigrationInterface {
  name = 'AdjustDB1746553164853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "specificTime" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP COLUMN "specificTime"`,
    );
  }
}
