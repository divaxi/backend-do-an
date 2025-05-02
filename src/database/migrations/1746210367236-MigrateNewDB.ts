import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateNewDB1746210367236 implements MigrationInterface {
  name = 'MigrateNewDB1746210367236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_b824ca5377adbc0cd41ef98c81f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_576572ccc423bf023f4d6c164d9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_576572ccc423bf023f4d6c164d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "userId" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "PK_d72ea127f30e21753c9e229891e" TO "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "user_userId_seq" RENAME TO "user_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" RENAME COLUMN "userUserId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "PK_a455629d6ffbd1f2953f453f3f9"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "staffId"`);
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "UQ_b824ca5377adbc0cd41ef98c81f"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "userIdUserId"`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "staff" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "UQ_eba76c23bcfc9dad2479b7fd2ad" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "UQ_eba76c23bcfc9dad2479b7fd2ad"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "PK_e4ee98bb552756c180aec1e854a"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "staff" ADD "userIdUserId" integer`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "UQ_b824ca5377adbc0cd41ef98c81f" UNIQUE ("userIdUserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "staffId" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "PK_a455629d6ffbd1f2953f453f3f9" PRIMARY KEY ("staffId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" RENAME COLUMN "userId" TO "userUserId"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "user_id_seq" RENAME TO "user_userId_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_d72ea127f30e21753c9e229891e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "id" TO "userId"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_576572ccc423bf023f4d6c164d" ON "session" ("userUserId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_576572ccc423bf023f4d6c164d9" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_b824ca5377adbc0cd41ef98c81f" FOREIGN KEY ("userIdUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
