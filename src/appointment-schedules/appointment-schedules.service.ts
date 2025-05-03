import { AppointmentsService } from '../appointments/appointments.service';
import { SchedulesService } from '../schedules/schedules.service';
import { Schedule } from '../schedules/domain/schedule';
import { Appointment } from '../appointments/domain/appointment';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
// import { CreateAppointmentScheduleDto } from './dto/create-appointment-schedule.dto';
import { UpdateAppointmentScheduleDto } from './dto/update-appointment-schedule.dto';
import { AppointmentScheduleRepository } from './infrastructure/persistence/appointment-schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AppointmentSchedule } from './domain/appointment-schedule';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateAppointmentDto } from '../appointments/dto/create-appointment.dto';

interface AppointmentCreatedPayload {
  appointment: Appointment;
  dto: CreateAppointmentDto;
}

@Injectable()
export class AppointmentSchedulesService {
  private readonly logger = new Logger(AppointmentSchedulesService.name);

  constructor(
    private readonly appointmentService: AppointmentsService,
    private readonly scheduleService: SchedulesService,
    private readonly appointmentScheduleRepository: AppointmentScheduleRepository,
  ) {}

  @OnEvent('appointment.created')
  async handleAppointmentCreated(payload: AppointmentCreatedPayload) {
    this.logger.log(
      `Handling appointment.created event for appointment ID: ${payload.appointment.id}`,
    );
    const { appointment, dto } = payload;

    if (!dto.schedules || dto.schedules.length === 0) {
      this.logger.log(
        `No schedules provided for appointment ID: ${appointment.id}. Skipping schedule creation.`,
      );
      return;
    }

    try {
      const scheduleIds = dto.schedules.map((s) => s.id);

      const scheduleObjects = await this.scheduleService.findByIds(scheduleIds);

      if (scheduleObjects.length !== scheduleIds.length) {
        this.logger.error(
          `Some schedule IDs do not exist for appointment ID: ${appointment.id}. Provided IDs: ${scheduleIds.join(', ')}`,
        );
        const validScheduleMap = new Map(scheduleObjects.map((s) => [s.id, s]));
        const validSchedulesData = dto.schedules.filter((sDto) =>
          validScheduleMap.has(sDto.id),
        );

        if (validSchedulesData.length === 0) {
          this.logger.error(
            `No valid schedules found for appointment ID: ${appointment.id}. Aborting schedule creation.`,
          );
          return;
        }
        this.logger.warn(
          `Proceeding with only valid schedules for appointment ID: ${appointment.id}`,
        );
      }

      const scheduleCreationPromises = dto.schedules
        .filter((scheduleDto) =>
          scheduleObjects.some((s) => s.id === scheduleDto.id),
        )
        .map(async (scheduleDto) => {
          const scheduleObject = scheduleObjects.find(
            (s) => s.id === scheduleDto.id,
          );

          if (!scheduleObject) {
            this.logger.warn(
              `Schedule object with ID ${scheduleDto.id} unexpectedly not found during creation for appointment ${appointment.id}. Skipping.`,
            );
            return null;
          }

          try {
            return await this.appointmentScheduleRepository.create({
              appointment: appointment,
              schedule: scheduleObject,
              specificTime: scheduleDto.specificTime,
            });
          } catch (error) {
            this.logger.error(
              `Failed to create appointment schedule for appointment ${appointment.id} and schedule ${scheduleObject.id}`,
              error.stack,
            );
            return null;
          }
        });

      const results = await Promise.all(scheduleCreationPromises);
      const createdCount = results.filter((r) => r !== null).length;
      this.logger.log(
        `Successfully created ${createdCount} appointment schedules for appointment ID: ${appointment.id}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to handle appointment.created event for appointment ID: ${payload.appointment.id}`,
        error.stack,
      );
    }
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
      specificTime: updateAppointmentScheduleDto.specificTime,
      appointment,
      schedule,
    });
  }

  remove(id: AppointmentSchedule['id']) {
    return this.appointmentScheduleRepository.remove(id);
  }
}
