import { Reception } from '../../../../domain/reception';

import { AppointmentMapper } from '../../../../../appointments/infrastructure/persistence/relational/mappers/appointment.mapper';

import { ReceptionEntity } from '../entities/reception.entity';

export class ReceptionMapper {
  static toDomain(raw: ReceptionEntity): Reception {
    const domainEntity = new Reception();
    domainEntity.note = raw.note;

    domainEntity.status = raw.status;

    domainEntity.checkinTime = raw.checkinTime;

    if (raw.Appointment) {
      domainEntity.Appointment = AppointmentMapper.toDomain(raw.Appointment);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Reception): ReceptionEntity {
    const persistenceEntity = new ReceptionEntity();
    persistenceEntity.note = domainEntity.note;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.checkinTime = domainEntity.checkinTime;

    if (domainEntity.Appointment) {
      persistenceEntity.Appointment = AppointmentMapper.toPersistence(
        domainEntity.Appointment,
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
