import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRecordEntity } from '../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerRecordSeedService {
  constructor(
    @InjectRepository(CustomerRecordEntity)
    private repository: Repository<CustomerRecordEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(this.repository.create({}));
    }
  }
}
