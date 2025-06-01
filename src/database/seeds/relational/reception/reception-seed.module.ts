import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptionEntity } from '../../../../receptions/infrastructure/persistence/relational/entities/reception.entity';
import { ReceptionSeedService } from './reception-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReceptionEntity])],
  providers: [ReceptionSeedService],
  exports: [ReceptionSeedService],
})
export class ReceptionSeedModule {}
