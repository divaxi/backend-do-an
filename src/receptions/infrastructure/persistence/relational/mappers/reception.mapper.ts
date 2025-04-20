import { Reception } from '../../../../domain/reception';
import { ReceptionEntity } from '../entities/reception.entity';

export class ReceptionMapper {
  static toDomain(raw: ReceptionEntity): Reception {
    const domainEntity = new Reception();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Reception): ReceptionEntity {
    const persistenceEntity = new ReceptionEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
