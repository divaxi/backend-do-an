import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';
import { Repository } from 'typeorm';
import { CustomerRecordEntity } from '../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';
import { StatusEnum as AppointmentStatus } from '../../../../appointments/status.enum';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppointmentSeedService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private repository: Repository<AppointmentEntity>,
    @InjectRepository(CustomerRecordEntity)
    private customerRecordRepository: Repository<CustomerRecordEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const customerRecords = await this.customerRecordRepository.find({
        where: {
          active: true,
        },
      });
      const repeater = 10;

      const appointments = Array.from({ length: repeater }, () =>
        this.repository.create({
          customerRecord: faker.helpers.arrayElement(customerRecords),
          specificTime: faker.date.future({
            years: 2025,
            refDate: new Date(),
          }),
          note: faker.lorem.sentence({
            min: 10,
            max: 20,
          }),
          active: true,
          status: faker.helpers.enumValue(AppointmentStatus),
        }),
      );
      await this.repository.save(appointments);
    }
  }
}
