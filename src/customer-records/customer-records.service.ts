import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
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

    private readonly usersService: UsersService,
  ) {}

  async create(
    createCustomerRecordDto: CreateCustomerRecordDto,
    id: User['id'],
  ) {
    // Do not remove comment below.
    // <creating-property />

    let user: User | undefined = undefined;

    if (id) {
      const userObject = await this.usersService.findById(id);
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    }

    return this.customerRecordRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      active: createCustomerRecordDto.active,

      BHYTNumber: createCustomerRecordDto.BHYTNumber,

      CCCDNumber: createCustomerRecordDto.CCCDNumber,

      DOB: createCustomerRecordDto.DOB,

      sex: createCustomerRecordDto.sex,

      fullName: createCustomerRecordDto.fullName,

      user,
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
  findByUser(userId: number) {
    return this.customerRecordRepository.findByUser(userId);
  }

  async update(
    id: CustomerRecord['id'],

    updateCustomerRecordDto: UpdateCustomerRecordDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | undefined = undefined;

    if (updateCustomerRecordDto.user) {
      const userObject = await this.usersService.findById(
        updateCustomerRecordDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    }

    return this.customerRecordRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      active: updateCustomerRecordDto.active,

      BHYTNumber: updateCustomerRecordDto.BHYTNumber,

      CCCDNumber: updateCustomerRecordDto.CCCDNumber,

      DOB: updateCustomerRecordDto.DOB,

      sex: updateCustomerRecordDto.sex,

      fullName: updateCustomerRecordDto.fullName,

      user,
    });
  }

  remove(id: CustomerRecord['id']) {
    return this.customerRecordRepository.update(id, {
      active: false,
    });
  }
}
