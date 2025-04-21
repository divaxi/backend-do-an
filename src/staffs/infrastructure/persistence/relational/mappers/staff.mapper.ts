import { Staff } from '../../../../domain/staff';

import { StaffEntity } from '../entities/staff.entity';

export class StaffMapper {
  static toDomain(raw: StaffEntity): Staff {
    const domainEntity = new Staff();
    domainEntity.note = raw.note;

    domainEntity.role = raw.role;

    domainEntity.zaloId = raw.zaloId;

    domainEntity.phoneNumber = raw.phoneNumber;

    domainEntity.fullName = raw.fullName;

    domainEntity.staffId = raw.staffId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Staff): StaffEntity {
    const persistenceEntity = new StaffEntity();
    persistenceEntity.note = domainEntity.note;

    persistenceEntity.role = domainEntity.role;

    persistenceEntity.zaloId = domainEntity.zaloId;

    persistenceEntity.phoneNumber = domainEntity.phoneNumber;

    persistenceEntity.fullName = domainEntity.fullName;

    if (domainEntity.staffId) {
      persistenceEntity.staffId = domainEntity.staffId;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
