import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { addMinutes, isBefore, set } from 'date-fns';

import { ScheduleEntity } from '../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';

@Injectable()
export class ScheduleSeedService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly repository: Repository<ScheduleEntity>,
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();
    if (count > 0) {
      console.log('ℹ️ Schedule already seeded.');
      return;
    }

    const staffs = await this.staffRepository.find();
    const schedules: ScheduleEntity[] = [];

    const now = new Date();
    const dayStart = set(now, {
      hours: 8,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    const dayEnd = set(now, {
      hours: 17,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    for (const staff of staffs) {
      let current = dayStart;
      while (isBefore(current, dayEnd)) {
        const next = addMinutes(current, 30);
        schedules.push(
          this.repository.create({
            staff,
            note: faker.lorem.sentence({ min: 5, max: 15 }),
            startTime: current,
            endTime: next,
            active: true,
          }),
        );
        current = next;
      }
    }

    await this.repository.save(schedules);
    console.log(`✅ Seeded schedules for ${staffs.length} staff(s).`);
  }
}
