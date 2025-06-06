import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';
import { Repository } from 'typeorm';
import { CustomerRecordEntity } from '../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';
import { ServiceEntity } from '../../../../services/infrastructure/persistence/relational/entities/service.entity';
import { ScheduleEntity } from '../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';
import { StatusEnum as AppointmentStatus } from '../../../../appointments/status.enum';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppointmentSeedService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private repository: Repository<AppointmentEntity>,
    @InjectRepository(CustomerRecordEntity)
    private customerRecordRepository: Repository<CustomerRecordEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const customerRecords = await this.customerRecordRepository.find({
        where: {
          active: true,
        },
      });

      const services = await this.serviceRepository.find();
      const schedules = await this.scheduleRepository.find({
        where: {
          active: true,
        },
      });

      const repeater = 10;

      const appointments = Array.from({ length: repeater }, () =>
        this.repository.create({
          customerRecord: faker.helpers.arrayElement(customerRecords),
          service: faker.helpers.arrayElement(services),
          schedule: faker.helpers.arrayElement(schedules),
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
