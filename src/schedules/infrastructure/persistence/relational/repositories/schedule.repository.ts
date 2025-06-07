import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import { ScheduleEntity } from '../entities/schedule.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Schedule } from '../../../../domain/schedule';
import { ScheduleRepository } from '../../schedule.repository';
import { ScheduleMapper } from '../mappers/schedule.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { endOfDay, startOfDay } from 'date-fns';

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
  async bulkCreate(data: Schedule[]): Promise<Schedule[]> {
    const persistenceModel = data.map((d) => ScheduleMapper.toPersistence(d));
    const newEntities = await this.scheduleRepository.save(
      this.scheduleRepository.create(persistenceModel),
    );
    return newEntities.map((entity) => ScheduleMapper.toDomain(entity));
  }

  async findAllWithPagination({
    paginationOptions,
    staffId,
  }: {
    paginationOptions: IPaginationOptions;
    staffId: string;
  }): Promise<Schedule[]> {
    const entities = await this.scheduleRepository.find({
      where: {
        staff: { id: staffId },
        startTime: Between(startOfDay(new Date()), endOfDay(new Date())),
        active: true,
      },
      order: { startTime: 'ASC' },
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

  async findByDay(day: Date): Promise<Schedule[]> {
    const start = day;
    const end = new Date(day.getTime() + 24 * 60 * 60 * 1000);

    const entities = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .distinctOn(['schedule.startTime'])
      .where('schedule.startTime >= :start AND schedule.startTime < :end', {
        start,
        end,
      })
      .andWhere('schedule.active = true')
      .orderBy('schedule.startTime', 'ASC')
      .getMany();

    return entities.map(ScheduleMapper.toDomain);
  }

  async findByStaff(staffId: string, day: Date): Promise<Schedule[]> {
    const entities = await this.scheduleRepository.find({
      where: {
        staff: { id: staffId },
        active: true,
        startTime: Between(day, new Date(day.getTime() + 24 * 60 * 60 * 1000)),
      },
      order: { startTime: 'ASC' },
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
