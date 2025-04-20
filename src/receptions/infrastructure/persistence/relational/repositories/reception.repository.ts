import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ReceptionEntity } from '../entities/reception.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Reception } from '../../../../domain/reception';
import { ReceptionRepository } from '../../reception.repository';
import { ReceptionMapper } from '../mappers/reception.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ReceptionRelationalRepository implements ReceptionRepository {
  constructor(
    @InjectRepository(ReceptionEntity)
    private readonly receptionRepository: Repository<ReceptionEntity>,
  ) {}

  async create(data: Reception): Promise<Reception> {
    const persistenceModel = ReceptionMapper.toPersistence(data);
    const newEntity = await this.receptionRepository.save(
      this.receptionRepository.create(persistenceModel),
    );
    return ReceptionMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Reception[]> {
    const entities = await this.receptionRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ReceptionMapper.toDomain(entity));
  }

  async findById(id: Reception['id']): Promise<NullableType<Reception>> {
    const entity = await this.receptionRepository.findOne({
      where: { id },
    });

    return entity ? ReceptionMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Reception['id'][]): Promise<Reception[]> {
    const entities = await this.receptionRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ReceptionMapper.toDomain(entity));
  }

  async update(
    id: Reception['id'],
    payload: Partial<Reception>,
  ): Promise<Reception> {
    const entity = await this.receptionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.receptionRepository.save(
      this.receptionRepository.create(
        ReceptionMapper.toPersistence({
          ...ReceptionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ReceptionMapper.toDomain(updatedEntity);
  }

  async remove(id: Reception['id']): Promise<void> {
    await this.receptionRepository.delete(id);
  }
}
