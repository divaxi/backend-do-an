import { Result } from '../../../../domain/result';
import { ResultEntity } from '../entities/result.entity';

export class ResultMapper {
  static toDomain(raw: ResultEntity): Result {
    const domainEntity = new Result();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Result): ResultEntity {
    const persistenceEntity = new ResultEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
