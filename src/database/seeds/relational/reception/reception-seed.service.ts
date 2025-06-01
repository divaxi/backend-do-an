import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceptionEntity } from '../../../../receptions/infrastructure/persistence/relational/entities/reception.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReceptionSeedService {
  constructor(
    @InjectRepository(ReceptionEntity)
    private repository: Repository<ReceptionEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(this.repository.create({}));
    }
  }
}
