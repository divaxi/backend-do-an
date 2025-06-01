import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import zaloConfig from './auth/config/zalo.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';
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

import { AppointmentServicesModule } from './appointment-services/appointment-services.module';

import openAiConfig from './chatbot/config/open-ai.config';

import { MessagesModule } from './messages/messages.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { SatisticModule } from './satistic/satistic.module';

@Module({
  imports: [
    MessagesModule,
    EventEmitterModule.forRoot(),
    AppointmentServicesModule,
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
        mailConfig,
        fileConfig,
        zaloConfig,
        openAiConfig,
        // facebookConfig,
        // googleConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    // AuthFacebookModule,
    // AuthGoogleModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
