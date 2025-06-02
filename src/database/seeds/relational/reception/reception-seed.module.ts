import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptionEntity } from '../../../../receptions/infrastructure/persistence/relational/entities/reception.entity';
import { ReceptionSeedService } from './reception-seed.service';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceptionEntity]),
    TypeOrmModule.forFeature([AppointmentEntity]),
  ],
  providers: [ReceptionSeedService],
  exports: [ReceptionSeedService],
})
export class ReceptionSeedModule {}
