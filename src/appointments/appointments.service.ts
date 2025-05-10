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
import { FindAllAppointmentsDto } from './dto/find-all-appointments.dto';
import { TimeRangeDto } from './dto/time-range.dto';
import { StatusEnum } from './status.enum';

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
      customerRecord: customerRecordObject,
      specificTime: createAppointmentDto.specificTime,
      status: StatusEnum.pending,
    });

    this.eventEmitter.emit('appointment.created', {
      appointment: appointmentObject,
      dto: createAppointmentDto,
    });

    return appointmentObject;
  }

  findAllWithPagination({
    queryOptions,
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: Omit<FindAllAppointmentsDto, 'page' | 'limit'>;
  }) {
    return this.appointmentRepository.findAllWithPagination({
      queryOptions: {
        startTime: queryOptions.startTime,
        endTime: queryOptions.endTime,
        status: queryOptions.status,
      },
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

  count(timeRange: TimeRangeDto) {
    return this.appointmentRepository.count(timeRange);
  }

  countByCustomer(timeRange: TimeRangeDto) {
    return this.appointmentRepository.countByCustomer(timeRange);
  }

  async update(
    id: Appointment['id'],

    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentRepository.update(id, {
      active: updateAppointmentDto.active,

      note: updateAppointmentDto.note,

      status: updateAppointmentDto.status,
    });
  }

  remove(id: Appointment['id']) {
    return this.appointmentRepository.remove(id);
  }
}
