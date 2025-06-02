import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';
import { StaffSeedService } from './staff-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [StaffSeedService],
  exports: [StaffSeedService],
})
export class StaffSeedModule {}
