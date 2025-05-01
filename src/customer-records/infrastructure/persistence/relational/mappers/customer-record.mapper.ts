import { CustomerRecord } from '../../../../domain/customer-record';
import { CustomerRecordEntity } from '../entities/customer-record.entity';

export class CustomerRecordMapper {
  static toDomain(raw: CustomerRecordEntity): CustomerRecord {
    const domainEntity = new CustomerRecord();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: CustomerRecord): CustomerRecordEntity {
    const persistenceEntity = new CustomerRecordEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
