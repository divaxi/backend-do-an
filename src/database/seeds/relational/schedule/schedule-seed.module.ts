import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from '../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';
import { ScheduleSeedService } from './schedule-seed.service';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleEntity]),
    TypeOrmModule.forFeature([StaffEntity]),
  ],
  providers: [ScheduleSeedService],
  exports: [ScheduleSeedService],
})
export class ScheduleSeedModule {}
