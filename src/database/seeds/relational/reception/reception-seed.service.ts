import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceptionEntity } from '../../../../receptions/infrastructure/persistence/relational/entities/reception.entity';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';
import { faker } from '@faker-js/faker';
import { StatusEnum as ReceptionStatus } from '../../../../receptions/status.enum';

@Injectable()
export class ReceptionSeedService {
  constructor(
    @InjectRepository(ReceptionEntity)
    private repository: Repository<ReceptionEntity>,
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const appointments = await this.appointmentRepository.find({
        where: {
          active: true,
        },
      });

      const receptions = appointments.map((appointment) => {
        const randomStatus = faker.helpers.enumValue(ReceptionStatus);
        const checkinTime =
          randomStatus === ReceptionStatus.checkin ? faker.date.past() : null;

        return this.repository.create({
          Appointment: appointment,
          status: randomStatus,
          checkinTime,
          note: faker.lorem.sentence({ min: 2, max: 5 }),
        });
      });

      await this.repository.save(receptions);
    }
  }
}
