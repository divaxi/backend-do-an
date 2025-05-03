import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustServiceWithImage1746261249976 implements MigrationInterface {
  name = 'AdjustServiceWithImage1746261249976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "service" ADD "imageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "UQ_9c93c2b5cc0f33d32b28e4a51c8" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ALTER COLUMN "active" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_9c93c2b5cc0f33d32b28e4a51c8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_9c93c2b5cc0f33d32b28e4a51c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ALTER COLUMN "active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "UQ_9c93c2b5cc0f33d32b28e4a51c8"`,
    );
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "imageId"`);
  }
}
