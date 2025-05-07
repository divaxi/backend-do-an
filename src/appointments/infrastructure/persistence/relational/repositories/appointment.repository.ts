import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import { AppointmentEntity } from '../entities/appointment.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Appointment } from '../../../../domain/appointment';
import { AppointmentRepository } from '../../appointment.repository';
import { AppointmentMapper } from '../mappers/appointment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FindAllAppointmentsDto } from '../../../../dto/find-all-appointments.dto';
import { AppointmentSatisticDto } from '../../../../dto/satistic.dto';
import { TimeRangeDto } from '../../../../dto/time-range.dto';

@Injectable()
export class AppointmentRelationalRepository implements AppointmentRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async create(data: Appointment): Promise<Appointment> {
    const persistenceModel = AppointmentMapper.toPersistence(data);
    const newEntity = await this.appointmentRepository.save(
      this.appointmentRepository.create(persistenceModel),
    );
    return AppointmentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    queryOptions,
    paginationOptions,
  }: {
    queryOptions: Omit<FindAllAppointmentsDto, 'page' | 'limit'>;
    paginationOptions: IPaginationOptions;
  }): Promise<Appointment[]> {
    const where: any = {};

    if (queryOptions.startTime && queryOptions.endTime) {
      where.specificTime = Between(
        queryOptions.startTime,
        queryOptions.endTime,
      );
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    const entities = await this.appointmentRepository.find({
      where,
      order: { specificTime: 'DESC' },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AppointmentMapper.toDomain(entity));
  }

  async findById(id: Appointment['id']): Promise<NullableType<Appointment>> {
    const entity = await this.appointmentRepository.findOne({
      where: { id },
    });

    return entity ? AppointmentMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Appointment['id'][]): Promise<Appointment[]> {
    const entities = await this.appointmentRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AppointmentMapper.toDomain(entity));
  }

  async count(timeRange: TimeRangeDto): Promise<AppointmentSatisticDto> {
    const count = await this.appointmentRepository.count({
      where: { specificTime: Between(timeRange.startTime, timeRange.endTime) },
    });
    return { count };
  }

  async update(
    id: Appointment['id'],
    payload: Partial<Appointment>,
  ): Promise<Appointment> {
    const entity = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.appointmentRepository.save(
      this.appointmentRepository.create(
        AppointmentMapper.toPersistence({
          ...AppointmentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AppointmentMapper.toDomain(updatedEntity);
  }

  async remove(id: Appointment['id']): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}
