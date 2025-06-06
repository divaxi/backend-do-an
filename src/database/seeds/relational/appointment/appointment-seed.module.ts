import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';
import { AppointmentSeedService } from './appointment-seed.service';
import { CustomerRecordEntity } from '../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';
import { ServiceEntity } from '../../../../services/infrastructure/persistence/relational/entities/service.entity';
import { ScheduleEntity } from '../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppointmentEntity,
      CustomerRecordEntity,
      ServiceEntity,
      ScheduleEntity,
    ]),
  ],
  providers: [AppointmentSeedService],
  exports: [AppointmentSeedService],
})
export class AppointmentSeedModule {}
