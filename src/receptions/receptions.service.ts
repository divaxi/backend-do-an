import { AppointmentsService } from '../appointments/appointments.service';
import { Appointment } from '../appointments/domain/appointment';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { UpdateReceptionDto } from './dto/update-reception.dto';
import { ReceptionRepository } from './infrastructure/persistence/reception.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Reception } from './domain/reception';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateAppointmentDto } from '../appointments/dto/create-appointment.dto';
import { StatusEnum } from './status.enum';

interface AppointmentCreatedPayload {
  appointment: Appointment;
  dto: CreateAppointmentDto;
}

@Injectable()
export class ReceptionsService {
  constructor(
    private readonly appointmentService: AppointmentsService,

    // Dependencies here
    private readonly receptionRepository: ReceptionRepository,
  ) {}

  @OnEvent(`appointment.created`)
  async handleAppointmentCreated(payload: AppointmentCreatedPayload) {
    const { appointment } = payload;

    if (!appointment) {
      return;
    }
    await this.receptionRepository.create({
      Appointment: appointment,
      status: StatusEnum.notCheckin,
    });
  }

  async create(createReceptionDto: CreateReceptionDto) {
    // Do not remove comment below.
    // <creating-property />

    const AppointmentObject = await this.appointmentService.findById(
      createReceptionDto.Appointment.id,
    );
    if (!AppointmentObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          Appointment: 'notExists',
        },
      });
    }
    const Appointment = AppointmentObject;

    return this.receptionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      note: createReceptionDto.note,

      status: StatusEnum.notCheckin,

      checkinTime: createReceptionDto.checkinTime,

      Appointment,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.receptionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Reception['id']) {
    return this.receptionRepository.findById(id);
  }

  findByIds(ids: Reception['id'][]) {
    return this.receptionRepository.findByIds(ids);
  }

  findByAppointment(appointmentId) {
    return this.receptionRepository.findByAppointment(appointmentId);
  }

  async update(
    id: Reception['id'],

    updateReceptionDto: UpdateReceptionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let Appointment: Appointment | undefined = undefined;

    if (updateReceptionDto.Appointment) {
      const AppointmentObject = await this.appointmentService.findById(
        updateReceptionDto.Appointment.id,
      );
      if (!AppointmentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            Appointment: 'notExists',
          },
        });
      }
      Appointment = AppointmentObject;
    }

    return this.receptionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      note: updateReceptionDto.note,

      checkinTime: updateReceptionDto.checkinTime,

      status: updateReceptionDto.status,

      Appointment,
    });
  }

  remove(id: Reception['id']) {
    return this.receptionRepository.remove(id);
  }
}
