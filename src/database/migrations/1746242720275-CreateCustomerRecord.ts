import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerRecord1746242720275 implements MigrationInterface {
  name = 'CreateCustomerRecord1746242720275';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD "active" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD "BHYTNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD "CCCDNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD "DOB" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD "sex" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD "fullName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD "userIdId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD CONSTRAINT "FK_1a4b950e00f0eab952c66926b6f" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP CONSTRAINT "FK_1a4b950e00f0eab952c66926b6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP COLUMN "userIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP COLUMN "fullName"`,
    );
    await queryRunner.query(`ALTER TABLE "customer_record" DROP COLUMN "sex"`);
    await queryRunner.query(`ALTER TABLE "customer_record" DROP COLUMN "DOB"`);
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP COLUMN "CCCDNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP COLUMN "BHYTNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP COLUMN "active"`,
    );
  }
}
