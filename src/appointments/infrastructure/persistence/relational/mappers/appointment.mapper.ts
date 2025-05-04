import { Appointment } from '../../../../domain/appointment';
import { StaffMapper } from '../../../../../staffs/infrastructure/persistence/relational/mappers/staff.mapper';

import { CustomerRecordMapper } from '../../../../../customer-records/infrastructure/persistence/relational/mappers/customer-record.mapper';

import { AppointmentEntity } from '../entities/appointment.entity';

export class AppointmentMapper {
  static toDomain(raw: AppointmentEntity): Appointment {
    const domainEntity = new Appointment();
    if (raw.staff) {
      domainEntity.staff = StaffMapper.toDomain(raw.staff);
    }

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
    if (domainEntity.staff) {
      persistenceEntity.staff = StaffMapper.toPersistence(domainEntity.staff);
    }

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
