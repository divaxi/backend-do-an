import { AppointmentsService } from '../appointments/appointments.service';
import { SchedulesService } from '../schedules/schedules.service';
import { Schedule } from '../schedules/domain/schedule';
import { Appointment } from '../appointments/domain/appointment';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAppointmentScheduleDto } from './dto/create-appointment-schedule.dto';
import { UpdateAppointmentScheduleDto } from './dto/update-appointment-schedule.dto';
import { AppointmentScheduleRepository } from './infrastructure/persistence/appointment-schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AppointmentSchedule } from './domain/appointment-schedule';
import { Appointment } from '../appointments/domain/appointment';

@Injectable()
export class AppointmentSchedulesService {
  constructor(
    private readonly appointmentService: AppointmentsService,

    private readonly scheduleService: SchedulesService,

    // Dependencies here
    private readonly appointmentScheduleRepository: AppointmentScheduleRepository,
  ) {}

  async create(createAppointmentScheduleDto: CreateAppointmentScheduleDto) {
    // Do not remove comment below.
    // <creating-property />

    const appointmentObject = await this.appointmentService.findById(
      createAppointmentScheduleDto.appointment.id,
    );
    if (!appointmentObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          appointment: 'notExists',
        },
      });
    }
    const appointment = appointmentObject;

    const scheduleObject = await this.scheduleService.findById(
      createAppointmentScheduleDto.schedule.id,
    );
    if (!scheduleObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          schedule: 'notExists',
        },
      });
    }
    const schedule = scheduleObject;

    return this.appointmentScheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      specificTime: createAppointmentScheduleDto.specificTime,

      appointment,

      schedule,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.appointmentScheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: AppointmentSchedule['id']) {
    return this.appointmentScheduleRepository.findById(id);
  }

  findByIds(ids: AppointmentSchedule['id'][]) {
    return this.appointmentScheduleRepository.findByIds(ids);
  }

  async update(
    id: AppointmentSchedule['id'],

    updateAppointmentScheduleDto: UpdateAppointmentScheduleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let appointment: Appointment | undefined = undefined;

    if (updateAppointmentScheduleDto.appointment) {
      const appointmentObject = await this.appointmentService.findById(
        updateAppointmentScheduleDto.appointment.id,
      );
      if (!appointmentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            appointment: 'notExists',
          },
        });
      }
      appointment = appointmentObject;
    }

    let schedule: Schedule | undefined = undefined;

    if (updateAppointmentScheduleDto.schedule) {
      const scheduleObject = await this.scheduleService.findById(
        updateAppointmentScheduleDto.schedule.id,
      );
      if (!scheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            schedule: 'notExists',
          },
        });
      }
      schedule = scheduleObject;
    }

    return this.appointmentScheduleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      specificTime: updateAppointmentScheduleDto.specificTime,

      appointment,

      schedule,
    });
  }

  remove(id: AppointmentSchedule['id']) {
    return this.appointmentScheduleRepository.remove(id);
  }
}
