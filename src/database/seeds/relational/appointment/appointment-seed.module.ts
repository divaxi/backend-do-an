import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';
import { AppointmentSeedService } from './appointment-seed.service';
import { CustomerRecordEntity } from '../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity]),
    TypeOrmModule.forFeature([CustomerRecordEntity]),
  ],
  providers: [AppointmentSeedService],
  exports: [AppointmentSeedService],
})
export class AppointmentSeedModule {}
