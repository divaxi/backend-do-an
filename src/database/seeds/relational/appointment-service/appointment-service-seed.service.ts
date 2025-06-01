import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentServiceEntity } from '../../../../appointment-services/infrastructure/persistence/relational/entities/appointment-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentServiceSeedService {
  constructor(
    @InjectRepository(AppointmentServiceEntity)
    private repository: Repository<AppointmentServiceEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(this.repository.create({}));
    }
  }
}
