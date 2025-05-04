import { StaffsService } from '../staffs/staffs.service';
import { CustomerRecordsService } from '../customer-records/customer-records.service';

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
    private readonly staffService: StaffsService,

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
    const staffObject = await this.staffService.findById(
      createAppointmentDto.staff.id,
    );
    if (!staffObject) {
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
      staff: staffObject,
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

  findAllWithPaginationByStaff({
    staffId,
    paginationOptions,
  }: {
    staffId: string;
    paginationOptions: IPaginationOptions;
  }) {
    return this.appointmentRepository.findAllWithPaginationByStaff({
      staffId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  async update(
    id: Appointment['id'],

    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentRepository.update(id, {
      active: updateAppointmentDto.active,

      note: updateAppointmentDto.note,

      status: updateAppointmentDto.status,

      // customerRecord,
      // staff,
    });
  }

  remove(id: Appointment['id']) {
    return this.appointmentRepository.remove(id);
  }
}
