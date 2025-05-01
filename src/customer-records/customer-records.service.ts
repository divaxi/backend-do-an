import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateCustomerRecordDto } from './dto/create-customer-record.dto';
import { UpdateCustomerRecordDto } from './dto/update-customer-record.dto';
import { CustomerRecordRepository } from './infrastructure/persistence/customer-record.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CustomerRecord } from './domain/customer-record';

@Injectable()
export class CustomerRecordsService {
  constructor(
    // Dependencies here
    private readonly customerRecordRepository: CustomerRecordRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createCustomerRecordDto: CreateCustomerRecordDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.customerRecordRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.customerRecordRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: CustomerRecord['id']) {
    return this.customerRecordRepository.findById(id);
  }

  findByIds(ids: CustomerRecord['id'][]) {
    return this.customerRecordRepository.findByIds(ids);
  }

  async update(
    id: CustomerRecord['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateCustomerRecordDto: UpdateCustomerRecordDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.customerRecordRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: CustomerRecord['id']) {
    return this.customerRecordRepository.remove(id);
  }
}
