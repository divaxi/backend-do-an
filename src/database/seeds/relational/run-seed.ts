import { NestFactory } from '@nestjs/core';
import { StaffSeedService } from './staff/staff-seed.service';
import { ServiceSeedService } from './service/service-seed.service';
import { ScheduleSeedService } from './schedule/schedule-seed.service';
import { ReceptionSeedService } from './reception/reception-seed.service';
import { FileSeedService } from './file/file-seed.service';
import { AppointmentServiceSeedService } from './appointment-service/appointment-service-seed.service';
import { AppointmentSeedService } from './appointment/appointment-seed.service';
import { CustomerRecordSeedService } from './customer-record/customer-record-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  // await app.get(RoleSeedService).run();

  await app.get(RoleSeedService).run();

  await app.get(FileSeedService).run();

  await app.get(UserSeedService).run();

  await app.get(CustomerRecordSeedService).run();

  await app.get(StaffSeedService).run();

  await app.get(ServiceSeedService).run();

  await app.get(ScheduleSeedService).run();

  await app.get(AppointmentSeedService).run();

  await app.get(AppointmentServiceSeedService).run();

  await app.get(ReceptionSeedService).run();

  await app.close();
};

void runSeed();
