import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AppointmentScheduleEntity } from '../entities/appointment-schedule.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AppointmentSchedule } from '../../../../domain/appointment-schedule';
import { AppointmentScheduleRepository } from '../../appointment-schedule.repository';
import { AppointmentScheduleMapper } from '../mappers/appointment-schedule.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Schedule } from '../../../../../schedules/domain/schedule';

@Injectable()
export class AppointmentScheduleRelationalRepository
  implements AppointmentScheduleRepository
{
  constructor(
    @InjectRepository(AppointmentScheduleEntity)
    private readonly appointmentScheduleRepository: Repository<AppointmentScheduleEntity>,
  ) {}

  async create(data: AppointmentSchedule): Promise<AppointmentSchedule> {
    const persistenceModel = AppointmentScheduleMapper.toPersistence(data);
    const newEntity = await this.appointmentScheduleRepository.save(
      this.appointmentScheduleRepository.create(persistenceModel),
    );
    return AppointmentScheduleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AppointmentSchedule[]> {
    const entities = await this.appointmentScheduleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AppointmentScheduleMapper.toDomain(entity));
  }

  async findById(
    id: AppointmentSchedule['id'],
  ): Promise<NullableType<AppointmentSchedule>> {
    const entity = await this.appointmentScheduleRepository.findOne({
      where: { id },
    });

    return entity ? AppointmentScheduleMapper.toDomain(entity) : null;
  }

  async findBySchedule(schedule: Schedule): Promise<AppointmentSchedule[]> {
    const entities = await this.appointmentScheduleRepository.find({
      where: { schedule: { id: schedule.id } },
    });
    return entities.map((entity) => AppointmentScheduleMapper.toDomain(entity));
  }

  async findByIds(
    ids: AppointmentSchedule['id'][],
  ): Promise<AppointmentSchedule[]> {
    const entities = await this.appointmentScheduleRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AppointmentScheduleMapper.toDomain(entity));
  }

  async update(
    id: AppointmentSchedule['id'],
    payload: Partial<AppointmentSchedule>,
  ): Promise<AppointmentSchedule> {
    const entity = await this.appointmentScheduleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.appointmentScheduleRepository.save(
      this.appointmentScheduleRepository.create(
        AppointmentScheduleMapper.toPersistence({
          ...AppointmentScheduleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AppointmentScheduleMapper.toDomain(updatedEntity);
  }

  async remove(id: AppointmentSchedule['id']): Promise<void> {
    await this.appointmentScheduleRepository.delete(id);
  }
}
