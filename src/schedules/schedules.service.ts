import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleRepository } from './infrastructure/persistence/schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Schedule } from './domain/schedule';

@Injectable()
export class SchedulesService {
  constructor(
    // Dependencies here
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createScheduleDto: CreateScheduleDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.scheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.scheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Schedule['id']) {
    return this.scheduleRepository.findById(id);
  }

  findByIds(ids: Schedule['id'][]) {
    return this.scheduleRepository.findByIds(ids);
  }

  async update(
    id: Schedule['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateScheduleDto: UpdateScheduleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.scheduleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Schedule['id']) {
    return this.scheduleRepository.remove(id);
  }
}
