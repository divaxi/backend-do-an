import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from '../../../../staffs/infrastructure/persistence/relational/entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffSeedService {
  constructor(
    @InjectRepository(StaffEntity)
    private repository: Repository<StaffEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(this.repository.create({}));
    }
  }
}
