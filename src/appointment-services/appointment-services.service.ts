import { AppointmentsService } from '../appointments/appointments.service';
import { Appointment } from '../appointments/domain/appointment';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
// import { CreateAppointmentServiceDto } from './dto/create-appointment-service.dto';
import { UpdateAppointmentServiceDto } from './dto/update-appointment-service.dto';
import { AppointmentServiceRepository } from './infrastructure/persistence/appointment-service.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AppointmentService } from './domain/appointment-service';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateAppointmentDto } from '../appointments/dto/create-appointment.dto';

interface AppointmentCreatedPayload {
  appointment: Appointment;
  dto: CreateAppointmentDto;
}

@Injectable()
export class AppointmentServicesService {
  private readonly logger = new Logger(AppointmentServicesService.name);

  constructor(
    // Dependencies here

    private readonly appointmentServiceRepository: AppointmentServiceRepository,
    private readonly appointmentService: AppointmentsService,
  ) {}

  @OnEvent('appointment.created')
  async handleAppointmentCreated(payload: AppointmentCreatedPayload) {
    this.logger.log(
      `Handling appointment.created event for appointment ID: ${payload.appointment.id}`,
    );
    const { appointment, dto } = payload;

    if (!dto.serviceAndScheduleIds || dto.serviceAndScheduleIds.length === 0) {
      this.logger.log(
        `No service or schedule IDs provided for appointment ID: ${appointment.id}. Skipping service relation creation.`,
      );
      return;
    }

    await Promise.all(
      dto.serviceAndScheduleIds.map((item) =>
        this.appointmentServiceRepository.create({
          scheduleId: item.scheduleId,
          appointment,
          serviceId: item.serviceId,
          staffId: item.staffId,
        }),
      ),
    );
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.appointmentServiceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: AppointmentService['id']) {
    return this.appointmentServiceRepository.findById(id);
  }

  findByIds(ids: AppointmentService['id'][]) {
    return this.appointmentServiceRepository.findByIds(ids);
  }

  findByStaff(staffId: string) {
    return this.appointmentServiceRepository.findByStaff(staffId);
  }

  async findAppointmentByStaff(staffId: string) {
    let appointmentService: AppointmentService[] | undefined = undefined;
    if (staffId) {
      const appointmentServiceObjects =
        await this.appointmentServiceRepository.findByStaff(staffId);
      if (
        !appointmentServiceObjects ||
        appointmentServiceObjects.length === 0
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            appointmentService: 'notExists',
          },
        });
      }
      appointmentService = appointmentServiceObjects;
    }
    const appointmentIds = appointmentService?.map(
      (appointmentService) => appointmentService.appointment.id,
    );
    if (!appointmentIds || appointmentIds.length === 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          appointment: 'notExists',
        },
      });
    }
    return this.appointmentService.findByIds(appointmentIds);
  }

  async update(
    id: AppointmentService['id'],

    updateAppointmentServiceDto: UpdateAppointmentServiceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let appointment: Appointment | undefined = undefined;

    if (updateAppointmentServiceDto.appointment) {
      const appointmentObject = await this.appointmentService.findById(
        updateAppointmentServiceDto.appointment.id,
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

    return this.appointmentServiceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />

      scheduleId: updateAppointmentServiceDto.schedule?.id,

      appointment: appointment,

      serviceId: updateAppointmentServiceDto.service?.id,
    });
  }

  remove(id: AppointmentService['id']) {
    return this.appointmentServiceRepository.remove(id);
  }
}
