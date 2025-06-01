import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentServiceEntity } from '../../../../appointment-services/infrastructure/persistence/relational/entities/appointment-service.entity';
import { AppointmentServiceSeedService } from './appointment-service-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentServiceEntity])],
  providers: [AppointmentServiceSeedService],
  exports: [AppointmentServiceSeedService],
})
export class AppointmentServiceSeedModule {}
