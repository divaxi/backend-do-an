import { AppointmentSchedule } from '../../../../domain/appointment-schedule';

import { AppointmentMapper } from '../../../../../appointments/infrastructure/persistence/relational/mappers/appointment.mapper';

import { ScheduleMapper } from '../../../../../schedules/infrastructure/persistence/relational/mappers/schedule.mapper';

import { AppointmentScheduleEntity } from '../entities/appointment-schedule.entity';

export class AppointmentScheduleMapper {
  static toDomain(raw: AppointmentScheduleEntity): AppointmentSchedule {
    const domainEntity = new AppointmentSchedule();
    domainEntity.specificTime = raw.specificTime;

    if (raw.appointment) {
      domainEntity.appointment = AppointmentMapper.toDomain(raw.appointment);
    }

    if (raw.schedule) {
      domainEntity.schedule = ScheduleMapper.toDomain(raw.schedule);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: AppointmentSchedule,
  ): AppointmentScheduleEntity {
    const persistenceEntity = new AppointmentScheduleEntity();
    persistenceEntity.specificTime = domainEntity.specificTime;

    if (domainEntity.appointment) {
      persistenceEntity.appointment = AppointmentMapper.toPersistence(
        domainEntity.appointment,
      );
    }

    if (domainEntity.schedule) {
      persistenceEntity.schedule = ScheduleMapper.toPersistence(
        domainEntity.schedule,
      );
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
