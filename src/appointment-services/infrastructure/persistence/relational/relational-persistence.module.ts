import { Module } from '@nestjs/common';
import { AppointmentServiceRepository } from '../appointment-service.repository';
import { AppointmentServiceRelationalRepository } from './repositories/appointment-service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentServiceEntity } from './entities/appointment-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentServiceEntity])],
  providers: [
    {
      provide: AppointmentServiceRepository,
      useClass: AppointmentServiceRelationalRepository,
    },
  ],
  exports: [AppointmentServiceRepository],
})
export class RelationalAppointmentServicePersistenceModule {}
