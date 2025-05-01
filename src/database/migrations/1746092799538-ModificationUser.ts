import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModificationUser1746092799538 implements MigrationInterface {
  name = 'ModificationUser1746092799538';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" RENAME COLUMN "userId" TO "userUserId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "socialId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "REL_75e2be4ce11d447ef43be0e374"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "userId" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "zaloId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "userName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phoneNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "avatarId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_58f5c71eaab331645112cf8cfa5" UNIQUE ("avatarId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_70b5c20c0450164001d85cdcc7" ON "user" ("zaloId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2578043e491921209f5dadd08" ON "user" ("phoneNumber") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_576572ccc423bf023f4d6c164d" ON "session" ("userUserId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_576572ccc423bf023f4d6c164d9" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_576572ccc423bf023f4d6c164d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_576572ccc423bf023f4d6c164d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f2578043e491921209f5dadd08"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da5934070b5f2726ebfd3122c8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_70b5c20c0450164001d85cdcc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_58f5c71eaab331645112cf8cfa5"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarId"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_f2578043e491921209f5dadd080"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "zaloId"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_d72ea127f30e21753c9e229891e"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "statusId" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "socialId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "provider" character varying NOT NULL DEFAULT 'email'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" RENAME COLUMN "userUserId" TO "userId"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
