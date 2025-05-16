import { Module } from '@nestjs/common';
import { AppointmentRepository } from '../appointment.repository';
import { AppointmentRelationalRepository } from './repositories/appointment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  providers: [
    {
      provide: AppointmentRepository,
      useClass: AppointmentRelationalRepository,
    },
  ],
  exports: [AppointmentRepository],
})
export class RelationalAppointmentPersistenceModule {}
