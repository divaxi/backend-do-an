import { AppointmentService } from '../../../../domain/appointment-service';
import { AppointmentMapper } from '../../../../../appointments/infrastructure/persistence/relational/mappers/appointment.mapper';

import { ServiceMapper } from '../../../../../services/infrastructure/persistence/relational/mappers/service.mapper';

import { AppointmentServiceEntity } from '../entities/appointment-service.entity';

export class AppointmentServiceMapper {
  static toDomain(raw: AppointmentServiceEntity): AppointmentService {
    const domainEntity = new AppointmentService();
    if (raw.appointment) {
      domainEntity.appointment = AppointmentMapper.toDomain(raw.appointment);
    }

    if (raw.service) {
      domainEntity.service = ServiceMapper.toDomain(raw.service);
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

    if (domainEntity.service) {
      persistenceEntity.service = ServiceMapper.toPersistence(
        domainEntity.service,
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
