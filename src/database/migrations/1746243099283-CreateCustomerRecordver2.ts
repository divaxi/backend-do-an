import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerRecordver21746243099283
  implements MigrationInterface
{
  name = 'CreateCustomerRecordver21746243099283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP CONSTRAINT "FK_1a4b950e00f0eab952c66926b6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" RENAME COLUMN "userIdId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD CONSTRAINT "FK_c6f634e87ae51466537a33e0965" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP CONSTRAINT "FK_c6f634e87ae51466537a33e0965"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" RENAME COLUMN "userId" TO "userIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD CONSTRAINT "FK_1a4b950e00f0eab952c66926b6f" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
