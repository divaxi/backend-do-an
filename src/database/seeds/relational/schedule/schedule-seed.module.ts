import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from '../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';
import { ScheduleSeedService } from './schedule-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity])],
  providers: [ScheduleSeedService],
  exports: [ScheduleSeedService],
})
export class ScheduleSeedModule {}
