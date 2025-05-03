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

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly customerRecordService: CustomerRecordsService,

    // Dependencies here
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // Do not remove comment below.
    // <creating-property />

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
    const customerRecord = customerRecordObject;

    return this.appointmentRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      active: createAppointmentDto.active,

      note: createAppointmentDto.note,

      status: createAppointmentDto.status,

      customerRecord,
    });
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
    // Do not remove comment below.
    // <updating-property />

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
      // Do not remove comment below.
      // <updating-property-payload />
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
