import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStaffTable1746204007458 implements MigrationInterface {
  name = 'CreateStaffTable1746204007458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "zaloId"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "fullName"`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "specialization" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "staff" ADD "userIdUserId" integer`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "UQ_b824ca5377adbc0cd41ef98c81f" UNIQUE ("userIdUserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_b824ca5377adbc0cd41ef98c81f" FOREIGN KEY ("userIdUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_b824ca5377adbc0cd41ef98c81f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "UQ_b824ca5377adbc0cd41ef98c81f"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "userIdUserId"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "specialization"`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "fullName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "phoneNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "zaloId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "role" character varying NOT NULL`,
    );
  }
}
