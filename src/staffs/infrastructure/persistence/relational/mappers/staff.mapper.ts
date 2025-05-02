import { Staff } from '../../../../domain/staff';

import { StaffEntity } from '../entities/staff.entity';

export class StaffMapper {
  static toDomain(raw: StaffEntity): Staff {
    const domainEntity = new Staff();
    domainEntity.note = raw.note;
    domainEntity.specialization = raw.specialization;

    domainEntity.staffId = raw.staffId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Staff): StaffEntity {
    const persistenceEntity = new StaffEntity();
    persistenceEntity.note = domainEntity.note;

    persistenceEntity.specialization = domainEntity.specialization;

    if (domainEntity.staffId) {
      persistenceEntity.staffId = domainEntity.staffId;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
