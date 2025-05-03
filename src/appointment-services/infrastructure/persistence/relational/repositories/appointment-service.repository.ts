import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AppointmentServiceEntity } from '../entities/appointment-service.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AppointmentService } from '../../../../domain/appointment-service';
import { AppointmentServiceRepository } from '../../appointment-service.repository';
import { AppointmentServiceMapper } from '../mappers/appointment-service.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AppointmentServiceRelationalRepository
  implements AppointmentServiceRepository
{
  constructor(
    @InjectRepository(AppointmentServiceEntity)
    private readonly appointmentServiceRepository: Repository<AppointmentServiceEntity>,
  ) {}

  async create(data: AppointmentService): Promise<AppointmentService> {
    const persistenceModel = AppointmentServiceMapper.toPersistence(data);
    const newEntity = await this.appointmentServiceRepository.save(
      this.appointmentServiceRepository.create(persistenceModel),
    );
    return AppointmentServiceMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AppointmentService[]> {
    const entities = await this.appointmentServiceRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AppointmentServiceMapper.toDomain(entity));
  }

  async findById(
    id: AppointmentService['id'],
  ): Promise<NullableType<AppointmentService>> {
    const entity = await this.appointmentServiceRepository.findOne({
      where: { id },
    });

    return entity ? AppointmentServiceMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: AppointmentService['id'][],
  ): Promise<AppointmentService[]> {
    const entities = await this.appointmentServiceRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AppointmentServiceMapper.toDomain(entity));
  }

  async update(
    id: AppointmentService['id'],
    payload: Partial<AppointmentService>,
  ): Promise<AppointmentService> {
    const entity = await this.appointmentServiceRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.appointmentServiceRepository.save(
      this.appointmentServiceRepository.create(
        AppointmentServiceMapper.toPersistence({
          ...AppointmentServiceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AppointmentServiceMapper.toDomain(updatedEntity);
  }

  async remove(id: AppointmentService['id']): Promise<void> {
    await this.appointmentServiceRepository.delete(id);
  }
}
