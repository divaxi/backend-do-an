import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentServiceEntity } from '../../../../appointment-services/infrastructure/persistence/relational/entities/appointment-service.entity';
import { AppointmentServiceSeedService } from './appointment-service-seed.service';
import { ScheduleEntity } from '../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';
import { ServiceEntity } from '../../../../services/infrastructure/persistence/relational/entities/service.entity';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentServiceEntity]),
    TypeOrmModule.forFeature([AppointmentEntity]),
    TypeOrmModule.forFeature([ScheduleEntity]),
    TypeOrmModule.forFeature([ServiceEntity]),
    TypeOrmModule.forFeature([StaffEntity]),
  ],
  providers: [AppointmentServiceSeedService],
  exports: [AppointmentServiceSeedService],
})
export class AppointmentServiceSeedModule {}
