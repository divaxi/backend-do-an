import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from '../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleSeedService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private repository: Repository<ScheduleEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(this.repository.create({}));
    }
  }
}
