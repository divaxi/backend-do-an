import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustCustomerRecord1746257131715 implements MigrationInterface {
  name = 'AdjustCustomerRecord1746257131715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ALTER COLUMN "active" SET DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer_record" ALTER COLUMN "active" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
