import { Staff } from '../../../../domain/staff';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { StaffEntity } from '../entities/staff.entity';

export class StaffMapper {
  static toDomain(raw: StaffEntity): Staff {
    const domainEntity = new Staff();
    domainEntity.note = raw.note;
    domainEntity.specialization = raw.specialization;

    domainEntity.id = raw.id;
    domainEntity.user = raw.user ? UserMapper.toDomain(raw.user) : null;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Staff): StaffEntity {
    const persistenceEntity = new StaffEntity();
    persistenceEntity.note = domainEntity.note;

    persistenceEntity.specialization = domainEntity.specialization;
    persistenceEntity.user = domainEntity.user
      ? UserMapper.toPersistence(domainEntity.user)
      : undefined;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
