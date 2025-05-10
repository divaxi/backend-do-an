import { MigrationInterface, QueryRunner } from 'typeorm';

export class DBDone1746707401393 implements MigrationInterface {
  name = 'DBDone1746707401393';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "zaloId" character varying, "userName" character varying, "phoneNumber" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "avatarId" uuid, "roleId" integer, CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("note" character varying, "specialization" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_eba76c23bcfc9dad2479b7fd2a" UNIQUE ("userId"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "service" ("price" integer, "description" character varying, "serviceName" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "imageId" uuid, CONSTRAINT "REL_9c93c2b5cc0f33d32b28e4a51c" UNIQUE ("imageId"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedule" ("note" character varying, "active" boolean NOT NULL DEFAULT true, "endTime" TIMESTAMP NOT NULL, "startTime" TIMESTAMP NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "staffId" uuid NOT NULL, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer_record" ("active" boolean NOT NULL DEFAULT true, "BHYTNumber" character varying, "CCCDNumber" character varying, "DOB" TIMESTAMP NOT NULL, "sex" character varying NOT NULL, "fullName" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_c74c60b74a549b8b7bbfc40a041" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."appointment_status_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "appointment" ("specificTime" TIMESTAMP NOT NULL, "active" boolean NOT NULL DEFAULT true, "note" character varying, "status" "public"."appointment_status_enum" NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerRecordId" uuid NOT NULL, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."reception_status_enum" AS ENUM('1', '2')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reception" ("note" character varying, "status" "public"."reception_status_enum" NOT NULL, "checkinTime" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "appointmentId" uuid NOT NULL, CONSTRAINT "REL_0f2ca2d67c1255427aabab5ea2" UNIQUE ("appointmentId"), CONSTRAINT "PK_68005a51f6e37ca7a0e5c305471" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "appointment_service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "scheduleId" uuid NOT NULL, "staffId" uuid NOT NULL, "serviceId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "appointmentId" uuid NOT NULL, CONSTRAINT "UQ_7e23f5dcb500335a31bf593f48c" UNIQUE ("scheduleId"), CONSTRAINT "REL_7e23f5dcb500335a31bf593f48" UNIQUE ("scheduleId"), CONSTRAINT "PK_a170b01d5845a629233fb80a51a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_9c93c2b5cc0f33d32b28e4a51c8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_f7ea080dcc6c08d60b48f620180" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" ADD CONSTRAINT "FK_c6f634e87ae51466537a33e0965" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_e84b6c9d3d9423add390d6b8ee9" FOREIGN KEY ("customerRecordId") REFERENCES "customer_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" ADD CONSTRAINT "FK_0f2ca2d67c1255427aabab5ea2f" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" ADD CONSTRAINT "FK_054035892daa7cd56acc828ff1c" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" ADD CONSTRAINT "FK_7e23f5dcb500335a31bf593f48c" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" ADD CONSTRAINT "FK_040c82b23e660475d29615eaac5" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" ADD CONSTRAINT "FK_1963f7aba7148362308fd7a5637" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment_service" DROP CONSTRAINT "FK_1963f7aba7148362308fd7a5637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" DROP CONSTRAINT "FK_040c82b23e660475d29615eaac5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" DROP CONSTRAINT "FK_7e23f5dcb500335a31bf593f48c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" DROP CONSTRAINT "FK_054035892daa7cd56acc828ff1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reception" DROP CONSTRAINT "FK_0f2ca2d67c1255427aabab5ea2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_e84b6c9d3d9423add390d6b8ee9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_record" DROP CONSTRAINT "FK_c6f634e87ae51466537a33e0965"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_f7ea080dcc6c08d60b48f620180"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_9c93c2b5cc0f33d32b28e4a51c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`,
    );
    await queryRunner.query(`DROP TABLE "appointment_service"`);
    await queryRunner.query(`DROP TABLE "reception"`);
    await queryRunner.query(`DROP TYPE "public"."reception_status_enum"`);
    await queryRunner.query(`DROP TABLE "appointment"`);
    await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
    await queryRunner.query(`DROP TABLE "customer_record"`);
    await queryRunner.query(`DROP TABLE "schedule"`);
    await queryRunner.query(`DROP TABLE "service"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f2578043e491921209f5dadd08"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da5934070b5f2726ebfd3122c8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_70b5c20c0450164001d85cdcc7"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
