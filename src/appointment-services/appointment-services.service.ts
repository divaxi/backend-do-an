import { AppointmentsService } from '../appointments/appointments.service';
import { ServicesService } from '../services/services.service';
import { Service } from '../services/domain/service';
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
    private readonly serviceService: ServicesService,

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

    if (!dto.serviceIds || dto.serviceIds.length === 0) {
      this.logger.log(
        `No service IDs provided for appointment ID: ${appointment.id}. Skipping service relation creation.`,
      );
      return;
    }

    try {
      const serviceIds = dto.serviceIds;

      const serviceObjects = await this.serviceService.findByIds(serviceIds);

      if (serviceObjects.length !== serviceIds.length) {
        this.logger.error(
          `Some service IDs do not exist for appointment ID: ${appointment.id}. Provided IDs: ${serviceIds.join(', ')}`,
        );
        const validServiceMap = new Map(serviceObjects.map((s) => [s.id, s]));
        const validServiceIds = serviceIds.filter((id) =>
          validServiceMap.has(id),
        );

        if (validServiceIds.length === 0) {
          this.logger.error(
            `No valid services found for appointment ID: ${appointment.id}. Aborting service relation creation.`,
          );
          return;
        }
        this.logger.warn(
          `Proceeding with only valid service IDs for appointment ID: ${appointment.id}: ${validServiceIds.join(', ')}`,
        );
      }

      const serviceCreationPromises = serviceObjects.map(
        async (serviceObject) => {
          try {
            return await this.appointmentServiceRepository.create({
              appointment: appointment,
              service: serviceObject,
            });
          } catch (error) {
            this.logger.error(
              `Failed to create appointment service relation for appointment ${appointment.id} and service ${serviceObject.id}`,
              error.stack,
            );
            return null;
          }
        },
      );

      const results = await Promise.all(serviceCreationPromises);
      const createdCount = results.filter((r) => r !== null).length;

      this.logger.log(
        `Successfully created ${createdCount} appointment service relations for appointment ID: ${appointment.id}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to handle appointment.created event (service relations) for appointment ID: ${payload.appointment.id}`,
        error.stack,
      );
    }
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
