import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { AppointmentServiceEntity } from '../../../../appointment-services/infrastructure/persistence/relational/entities/appointment-service.entity';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';
import { ServiceEntity } from '../../../../services/infrastructure/persistence/relational/entities/service.entity';
import { ScheduleEntity } from '../../../../schedules/infrastructure/persistence/relational/entities/schedule.entity';

@Injectable()
export class AppointmentServiceSeedService {
  constructor(
    @InjectRepository(AppointmentServiceEntity)
    private readonly repository: Repository<AppointmentServiceEntity>,
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();
    if (count > 0) return;

    const [appointments, schedules, services] = await Promise.all([
      this.appointmentRepository.find({ where: { active: true } }),
      this.scheduleRepository.find({
        where: { active: true },
      }),
      this.serviceRepository.find(),
    ]);

    let filterSchdules: typeof schedules = schedules;

    const appointmentServices = appointments.map((appointment) => {
      const randomSchedule = faker.helpers.arrayElement(filterSchdules);
      filterSchdules = schedules.filter(
        (appointment) => appointment !== randomSchedule,
      );
      return this.repository.create({
        appointment,
        service: faker.helpers.arrayElement(services),
        schedule: randomSchedule,
        staff: randomSchedule.staff,
      });
    });

    await this.repository.save(appointmentServices);
  }
}
