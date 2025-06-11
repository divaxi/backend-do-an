import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import fileConfig from './files/config/file.config';
import zaloConfig from './auth/config/zalo.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SessionModule } from './session/session.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

import { AppointmentsModule } from './appointments/appointments.module';

import { StaffsModule } from './staffs/staffs.module';

import { ReceptionsModule } from './receptions/receptions.module';

import { SchedulesModule } from './schedules/schedules.module';

import { ServicesModule } from './services/services.module';

import { CustomerRecordsModule } from './customer-records/customer-records.module';

import openAiConfig from './chatbot/config/open-ai.config';

import { MessagesModule } from './messages/messages.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { SatisticModule } from './satistic/satistic.module';

@Module({
  imports: [
    MessagesModule,
    EventEmitterModule.forRoot(),
    CustomerRecordsModule,
    CustomerRecordsModule,
    ServicesModule,
    SchedulesModule,
    ReceptionsModule,
    StaffsModule,
    AppointmentsModule,
    ChatbotModule,
    SatisticModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        fileConfig,
        zaloConfig,
        openAiConfig,
        // facebookConfig,
        // googleConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    UsersModule,
    FilesModule,
    AuthModule,
    // AuthFacebookModule,
    // AuthGoogleModule,
    SessionModule,
    HomeModule,
  ],
})
export class AppModule {}
