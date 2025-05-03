import { AppointmentsService } from '../appointments/appointments.service';
import { ServicesService } from '../services/services.service';
import { Service } from '../services/domain/service';
import { Appointment } from '../appointments/domain/appointment';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAppointmentServiceDto } from './dto/create-appointment-service.dto';
import { UpdateAppointmentServiceDto } from './dto/update-appointment-service.dto';
import { AppointmentServiceRepository } from './infrastructure/persistence/appointment-service.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AppointmentService } from './domain/appointment-service';

@Injectable()
export class AppointmentServicesService {
  constructor(
    private readonly serviceService: ServicesService,

    // Dependencies here

    private readonly appointmentServiceRepository: AppointmentServiceRepository,
    private readonly appointmentService: AppointmentsService,
  ) {}

  async create(createAppointmentServiceDto: CreateAppointmentServiceDto) {
    // Do not remove comment below.
    // <creating-property />
    const appointmentObject = await this.appointmentService.findById(
      createAppointmentServiceDto.appointment.id,
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

    const serviceObject = await this.serviceService.findById(
      createAppointmentServiceDto.service.id,
    );
    if (!serviceObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          service: 'notExists',
        },
      });
    }
    const service = serviceObject;

    return this.appointmentServiceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      appointment,

      service,
    });
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

    let service: Service | undefined = undefined;

    if (updateAppointmentServiceDto.service) {
      const serviceObject = await this.serviceService.findById(
        updateAppointmentServiceDto.service.id,
      );
      if (!serviceObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            service: 'notExists',
          },
        });
      }
      service = serviceObject;
    }

    return this.appointmentServiceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      appointment,

      service,
    });
  }

  remove(id: AppointmentService['id']) {
    return this.appointmentServiceRepository.remove(id);
  }
}
