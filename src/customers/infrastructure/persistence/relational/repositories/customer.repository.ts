import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Customer } from '../../../../domain/customer';
import { CustomerRepository } from '../../customer.repository';
import { CustomerMapper } from '../mappers/customer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CustomerRelationalRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const persistenceModel = CustomerMapper.toPersistence(data);
    const newEntity = await this.customerRepository.save(
      this.customerRepository.create(persistenceModel),
    );
    return CustomerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Customer[]> {
    const entities = await this.customerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CustomerMapper.toDomain(entity));
  }

  async findById(id: Customer['id']): Promise<NullableType<Customer>> {
    const entity = await this.customerRepository.findOne({
      where: { id },
    });

    return entity ? CustomerMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Customer['id'][]): Promise<Customer[]> {
    const entities = await this.customerRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CustomerMapper.toDomain(entity));
  }

  async update(
    id: Customer['id'],
    payload: Partial<Customer>,
  ): Promise<Customer> {
    const entity = await this.customerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.customerRepository.save(
      this.customerRepository.create(
        CustomerMapper.toPersistence({
          ...CustomerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CustomerMapper.toDomain(updatedEntity);
  }

  async remove(id: Customer['id']): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
