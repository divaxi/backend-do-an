import { StaffsService } from '../staffs/staffs.service';
import { Staff } from '../staffs/domain/staff';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleRepository } from './infrastructure/persistence/schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Schedule } from './domain/schedule';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly staffService: StaffsService,

    // Dependencies here
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    // Do not remove comment below.
    // <creating-property />

    const staffObject = await this.staffService.findById(
      createScheduleDto.staff.id,
    );
    if (!staffObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          staff: 'notExists',
        },
      });
    }
    const staff = staffObject;

    return this.scheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      note: createScheduleDto.note,

      active: createScheduleDto.active,

      endTime: createScheduleDto.endTime,

      startTime: createScheduleDto.startTime,

      staff,
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

    updateScheduleDto: UpdateScheduleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let staff: Staff | undefined = undefined;

    if (updateScheduleDto.staff) {
      const staffObject = await this.staffService.findById(
        updateScheduleDto.staff.id,
      );
      if (!staffObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            staff: 'notExists',
          },
        });
      }
      staff = staffObject;
    }

    return this.scheduleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      note: updateScheduleDto.note,

      active: updateScheduleDto.active,

      endTime: updateScheduleDto.endTime,

      startTime: updateScheduleDto.startTime,

      staff,
    });
  }

  remove(id: Schedule['id']) {
    return this.scheduleRepository.remove(id);
  }
}
