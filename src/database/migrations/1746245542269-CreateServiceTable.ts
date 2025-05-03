import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateServiceTable1746245542269 implements MigrationInterface {
  name = 'CreateServiceTable1746245542269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "service" ADD "price" integer`);
    await queryRunner.query(
      `ALTER TABLE "service" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "serviceName" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "serviceName"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "price"`);
  }
}
