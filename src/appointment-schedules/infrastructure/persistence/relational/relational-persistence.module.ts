import { Module } from '@nestjs/common';
import { AppointmentScheduleRepository } from '../appointment-schedule.repository';
import { AppointmentScheduleRelationalRepository } from './repositories/appointment-schedule.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentScheduleEntity } from './entities/appointment-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentScheduleEntity])],
  providers: [
    {
      provide: AppointmentScheduleRepository,
      useClass: AppointmentScheduleRelationalRepository,
    },
  ],
  exports: [AppointmentScheduleRepository],
})
export class RelationalAppointmentSchedulePersistenceModule {}
