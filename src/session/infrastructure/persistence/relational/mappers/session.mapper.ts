import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { Session } from '../../../../domain/session';
import { SessionEntity } from '../entities/session.entity';

export class SessionMapper {
  static toDomain(raw: SessionEntity): Session {
    const domainEntity = new Session();
    domainEntity.id = raw.id;
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    domainEntity.hash = raw.hash;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Session): SessionEntity {
    const user = new UserEntity();
    if (domainEntity.user && domainEntity.user.id) {
      user.id = Number(domainEntity.user.id);
    } else {
      // Handle the case where user or user.id is missing, e.g., throw error or assign default
      // For now, we'll assume user is always present based on Session domain definition
    }

    const persistenceEntity = new SessionEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.hash = domainEntity.hash;
    persistenceEntity.user = user;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}
