import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ScheduleEntity } from '../entities/schedule.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Schedule } from '../../../../domain/schedule';
import { ScheduleRepository } from '../../schedule.repository';
import { ScheduleMapper } from '../mappers/schedule.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ScheduleRelationalRepository implements ScheduleRepository {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async create(data: Schedule): Promise<Schedule> {
    const persistenceModel = ScheduleMapper.toPersistence(data);
    const newEntity = await this.scheduleRepository.save(
      this.scheduleRepository.create(persistenceModel),
    );
    return ScheduleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Schedule[]> {
    const entities = await this.scheduleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ScheduleMapper.toDomain(entity));
  }

  async findById(id: Schedule['id']): Promise<NullableType<Schedule>> {
    const entity = await this.scheduleRepository.findOne({
      where: { id },
    });

    return entity ? ScheduleMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Schedule['id'][]): Promise<Schedule[]> {
    const entities = await this.scheduleRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ScheduleMapper.toDomain(entity));
  }

  async update(
    id: Schedule['id'],
    payload: Partial<Schedule>,
  ): Promise<Schedule> {
    const entity = await this.scheduleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.scheduleRepository.save(
      this.scheduleRepository.create(
        ScheduleMapper.toPersistence({
          ...ScheduleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ScheduleMapper.toDomain(updatedEntity);
  }

  async remove(id: Schedule['id']): Promise<void> {
    await this.scheduleRepository.delete(id);
  }
}
