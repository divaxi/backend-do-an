import { CustomerRecord } from '../../../../domain/customer-record';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { CustomerRecordEntity } from '../entities/customer-record.entity';

export class CustomerRecordMapper {
  static toDomain(raw: CustomerRecordEntity): CustomerRecord {
    const domainEntity = new CustomerRecord();
    domainEntity.active = raw.active;

    domainEntity.BHYTNumber = raw.BHYTNumber;

    domainEntity.CCCDNumber = raw.CCCDNumber;

    domainEntity.DOB = raw.DOB;

    domainEntity.sex = raw.sex;

    domainEntity.fullName = raw.fullName;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: CustomerRecord): CustomerRecordEntity {
    const persistenceEntity = new CustomerRecordEntity();
    persistenceEntity.active = domainEntity.active;

    persistenceEntity.BHYTNumber = domainEntity.BHYTNumber;

    persistenceEntity.CCCDNumber = domainEntity.CCCDNumber;

    persistenceEntity.DOB = domainEntity.DOB;

    persistenceEntity.sex = domainEntity.sex;

    persistenceEntity.fullName = domainEntity.fullName;

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
