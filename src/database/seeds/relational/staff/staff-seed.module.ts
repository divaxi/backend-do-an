import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';
import { StaffSeedService } from './staff-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity])],
  providers: [StaffSeedService],
  exports: [StaffSeedService],
})
export class StaffSeedModule {}
