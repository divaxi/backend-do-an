import { Appointment } from '../../../../domain/appointment';
import { ServiceMapper } from '../../../../../services/infrastructure/persistence/relational/mappers/service.mapper';

import { ScheduleMapper } from '../../../../../schedules/infrastructure/persistence/relational/mappers/schedule.mapper';

import { CustomerRecordMapper } from '../../../../../customer-records/infrastructure/persistence/relational/mappers/customer-record.mapper';

import { AppointmentEntity } from '../entities/appointment.entity';

export class AppointmentMapper {
  static toDomain(raw: AppointmentEntity): Appointment {
    const domainEntity = new Appointment();
    if (raw.service) {
      domainEntity.service = ServiceMapper.toDomain(raw.service);
    }

    if (raw.schedule) {
      domainEntity.schedule = ScheduleMapper.toDomain(raw.schedule);
    }

    domainEntity.specificTime = raw.specificTime;

    domainEntity.active = raw.active;

    domainEntity.note = raw.note;

    domainEntity.status = raw.status;

    if (raw.customerRecord) {
      domainEntity.customerRecord = CustomerRecordMapper.toDomain(
        raw.customerRecord,
      );
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Appointment): AppointmentEntity {
    const persistenceEntity = new AppointmentEntity();
    if (domainEntity.service) {
      persistenceEntity.service = ServiceMapper.toPersistence(
        domainEntity.service,
      );
    }

    if (domainEntity.schedule) {
      persistenceEntity.schedule = ScheduleMapper.toPersistence(
        domainEntity.schedule,
      );
    }

    persistenceEntity.specificTime = domainEntity.specificTime;

    persistenceEntity.active = domainEntity.active;

    persistenceEntity.note = domainEntity.note;

    persistenceEntity.status = domainEntity.status;

    if (domainEntity.customerRecord) {
      persistenceEntity.customerRecord = CustomerRecordMapper.toPersistence(
        domainEntity.customerRecord,
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
