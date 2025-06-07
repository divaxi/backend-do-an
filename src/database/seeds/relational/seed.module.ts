import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from '../../config/database.config';
import appConfig from '../../../config/app.config';

import { UserSeedModule } from './user/user-seed.module';

import { RoleSeedModule } from './role/role-seed.module';

import { CustomerRecordSeedModule } from './customer-record/customer-record-seed.module';

import { AppointmentSeedModule } from './appointment/appointment-seed.module';

import { FileSeedModule } from './file/file-seed.module';

import { ReceptionSeedModule } from './reception/reception-seed.module';

import { ScheduleSeedModule } from './schedule/schedule-seed.module';

import { ServiceSeedModule } from './service/service-seed.module';

import { StaffSeedModule } from './staff/staff-seed.module';
import { TypeOrmConfigService } from '../../typeorm-config.service';

@Module({
  imports: [
    StaffSeedModule,
    ServiceSeedModule,
    ScheduleSeedModule,
    ReceptionSeedModule,
    FileSeedModule,
    AppointmentSeedModule,
    CustomerRecordSeedModule,
    RoleSeedModule,
    UserSeedModule,
    RoleSeedModule,
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
