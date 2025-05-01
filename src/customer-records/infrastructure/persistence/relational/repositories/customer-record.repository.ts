import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CustomerRecordEntity } from '../entities/customer-record.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CustomerRecord } from '../../../../domain/customer-record';
import { CustomerRecordRepository } from '../../customer-record.repository';
import { CustomerRecordMapper } from '../mappers/customer-record.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CustomerRecordRelationalRepository
  implements CustomerRecordRepository
{
  constructor(
    @InjectRepository(CustomerRecordEntity)
    private readonly customerRecordRepository: Repository<CustomerRecordEntity>,
  ) {}

  async create(data: CustomerRecord): Promise<CustomerRecord> {
    const persistenceModel = CustomerRecordMapper.toPersistence(data);
    const newEntity = await this.customerRecordRepository.save(
      this.customerRecordRepository.create(persistenceModel),
    );
    return CustomerRecordMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CustomerRecord[]> {
    const entities = await this.customerRecordRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CustomerRecordMapper.toDomain(entity));
  }

  async findById(
    id: CustomerRecord['id'],
  ): Promise<NullableType<CustomerRecord>> {
    const entity = await this.customerRecordRepository.findOne({
      where: { id },
    });

    return entity ? CustomerRecordMapper.toDomain(entity) : null;
  }

  async findByIds(ids: CustomerRecord['id'][]): Promise<CustomerRecord[]> {
    const entities = await this.customerRecordRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CustomerRecordMapper.toDomain(entity));
  }

  async update(
    id: CustomerRecord['id'],
    payload: Partial<CustomerRecord>,
  ): Promise<CustomerRecord> {
    const entity = await this.customerRecordRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.customerRecordRepository.save(
      this.customerRecordRepository.create(
        CustomerRecordMapper.toPersistence({
          ...CustomerRecordMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CustomerRecordMapper.toDomain(updatedEntity);
  }

  async remove(id: CustomerRecord['id']): Promise<void> {
    await this.customerRecordRepository.delete(id);
  }
}
