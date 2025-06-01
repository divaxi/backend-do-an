import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';
import { AppointmentSeedService } from './appointment-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  providers: [AppointmentSeedService],
  exports: [AppointmentSeedService],
})
export class AppointmentSeedModule {}
