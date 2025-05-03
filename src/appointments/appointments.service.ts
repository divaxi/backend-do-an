import { CustomerRecordsService } from '../customer-records/customer-records.service';
import { CustomerRecord } from '../customer-records/domain/customer-record';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentRepository } from './infrastructure/persistence/appointment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Appointment } from './domain/appointment';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly customerRecordService: CustomerRecordsService,
    private readonly appointmentRepository: AppointmentRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const customerRecordObject = await this.customerRecordService.findById(
      createAppointmentDto.customerRecord.id,
    );
    if (!customerRecordObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          customerRecord: 'notExists',
        },
      });
    }

    const appointmentObject = await this.appointmentRepository.create({
      active: createAppointmentDto.active,
      note: createAppointmentDto.note,
      status: createAppointmentDto.status,
      customerRecord: customerRecordObject,
    });

    this.eventEmitter.emit('appointment.created', {
      appointment: appointmentObject,
      dto: createAppointmentDto,
    });

    return appointmentObject;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.appointmentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Appointment['id']) {
    return this.appointmentRepository.findById(id);
  }

  findByIds(ids: Appointment['id'][]) {
    return this.appointmentRepository.findByIds(ids);
  }

  async update(
    id: Appointment['id'],

    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    let customerRecord: CustomerRecord | undefined = undefined;

    if (updateAppointmentDto.customerRecord) {
      const customerRecordObject = await this.customerRecordService.findById(
        updateAppointmentDto.customerRecord.id,
      );
      if (!customerRecordObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            customerRecord: 'notExists',
          },
        });
      }
      customerRecord = customerRecordObject;
    }

    return this.appointmentRepository.update(id, {
      active: updateAppointmentDto.active,

      note: updateAppointmentDto.note,

      status: updateAppointmentDto.status,

      customerRecord,
    });
  }

  remove(id: Appointment['id']) {
    return this.appointmentRepository.remove(id);
  }
}
