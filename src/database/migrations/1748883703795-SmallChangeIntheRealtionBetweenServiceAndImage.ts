import { MigrationInterface, QueryRunner } from 'typeorm';

export class SmallChangeIntheRealtionBetweenServiceAndImage1748883703795
  implements MigrationInterface
{
  name = 'SmallChangeIntheRealtionBetweenServiceAndImage1748883703795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_9c93c2b5cc0f33d32b28e4a51c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "REL_9c93c2b5cc0f33d32b28e4a51c"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."appointment_status_enum" RENAME TO "appointment_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."appointment_status_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8')`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "status" TYPE "public"."appointment_status_enum" USING "status"::"text"::"public"."appointment_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."appointment_status_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_9c93c2b5cc0f33d32b28e4a51c8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_9c93c2b5cc0f33d32b28e4a51c8"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."appointment_status_enum_old" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "status" TYPE "public"."appointment_status_enum_old" USING "status"::"text"::"public"."appointment_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."appointment_status_enum_old" RENAME TO "appointment_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "REL_9c93c2b5cc0f33d32b28e4a51c" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_9c93c2b5cc0f33d32b28e4a51c8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
