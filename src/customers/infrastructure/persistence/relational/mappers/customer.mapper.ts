import { Customer } from '../../../../domain/customer';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerMapper {
  static toDomain(raw: CustomerEntity): Customer {
    const domainEntity = new Customer();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Customer): CustomerEntity {
    const persistenceEntity = new CustomerEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
