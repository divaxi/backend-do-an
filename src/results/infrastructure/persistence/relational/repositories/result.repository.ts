import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ResultEntity } from '../entities/result.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Result } from '../../../../domain/result';
import { ResultRepository } from '../../result.repository';
import { ResultMapper } from '../mappers/result.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ResultRelationalRepository implements ResultRepository {
  constructor(
    @InjectRepository(ResultEntity)
    private readonly resultRepository: Repository<ResultEntity>,
  ) {}

  async create(data: Result): Promise<Result> {
    const persistenceModel = ResultMapper.toPersistence(data);
    const newEntity = await this.resultRepository.save(
      this.resultRepository.create(persistenceModel),
    );
    return ResultMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Result[]> {
    const entities = await this.resultRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ResultMapper.toDomain(entity));
  }

  async findById(id: Result['id']): Promise<NullableType<Result>> {
    const entity = await this.resultRepository.findOne({
      where: { id },
    });

    return entity ? ResultMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Result['id'][]): Promise<Result[]> {
    const entities = await this.resultRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ResultMapper.toDomain(entity));
  }

  async update(id: Result['id'], payload: Partial<Result>): Promise<Result> {
    const entity = await this.resultRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.resultRepository.save(
      this.resultRepository.create(
        ResultMapper.toPersistence({
          ...ResultMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ResultMapper.toDomain(updatedEntity);
  }

  async remove(id: Result['id']): Promise<void> {
    await this.resultRepository.delete(id);
  }
}
