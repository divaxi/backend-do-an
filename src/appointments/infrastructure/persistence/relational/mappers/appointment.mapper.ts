import { Appointment } from '../../../../domain/appointment';
import { AppointmentEntity } from '../entities/appointment.entity';

export class AppointmentMapper {
  static toDomain(raw: AppointmentEntity): Appointment {
    const domainEntity = new Appointment();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Appointment): AppointmentEntity {
    const persistenceEntity = new AppointmentEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
