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

      const repeater = Math.min(4, schedules.length);

      const availableSchedules = [...schedules];

      const appointments = Array.from({ length: repeater }, () => {
        const randomIndex = Math.floor(
          Math.random() * availableSchedules.length,
        );
        const selectedSchedule = availableSchedules.splice(randomIndex, 1)[0];

        return this.repository.create({
          customerRecord: faker.helpers.arrayElement(customerRecords),
          service: faker.helpers.arrayElement(services),
          schedule: selectedSchedule,
          specificTime: selectedSchedule.startTime,
          note: faker.lorem.sentence({
            min: 10,
            max: 20,
          }),
          active: true,
          status: faker.helpers.enumValue(AppointmentStatus),
        });
      });

      await this.repository.save(appointments);
    }
  }
}
