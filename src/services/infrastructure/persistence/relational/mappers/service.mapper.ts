import { Service } from '../../../../domain/service';

import { ServiceEntity } from '../entities/service.entity';

export class ServiceMapper {
  static toDomain(raw: ServiceEntity): Service {
    const domainEntity = new Service();
    domainEntity.price = raw.price;

    domainEntity.description = raw.description;

    domainEntity.serviceName = raw.serviceName;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Service): ServiceEntity {
    const persistenceEntity = new ServiceEntity();
    persistenceEntity.price = domainEntity.price;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.serviceName = domainEntity.serviceName;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
