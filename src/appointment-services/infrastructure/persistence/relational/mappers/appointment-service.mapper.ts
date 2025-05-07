import { AppointmentService } from '../../../../domain/appointment-service';

import { AppointmentMapper } from '../../../../../appointments/infrastructure/persistence/relational/mappers/appointment.mapper';

import { AppointmentServiceEntity } from '../entities/appointment-service.entity';

export class AppointmentServiceMapper {
  static toDomain(raw: AppointmentServiceEntity): AppointmentService {
    const domainEntity = new AppointmentService();

    if (raw.scheduleId) {
      domainEntity.scheduleId = raw.scheduleId;
    }

    if (raw.appointment) {
      domainEntity.appointment = AppointmentMapper.toDomain(raw.appointment);
    }

    if (raw.serviceId) {
      domainEntity.serviceId = raw.serviceId;
    }

    if (raw.staffId) {
      domainEntity.staffId = raw.staffId;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: AppointmentService,
  ): AppointmentServiceEntity {
    const persistenceEntity = new AppointmentServiceEntity();

    if (domainEntity.appointment) {
      persistenceEntity.appointment = AppointmentMapper.toPersistence(
        domainEntity.appointment,
      );
    }

    if (domainEntity.staffId) {
      persistenceEntity.staffId = domainEntity.staffId;
    }

    if (domainEntity.serviceId) {
      persistenceEntity.serviceId = domainEntity.serviceId;
    }
    if (domainEntity.scheduleId) {
      persistenceEntity.scheduleId = domainEntity.scheduleId;
    }
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
