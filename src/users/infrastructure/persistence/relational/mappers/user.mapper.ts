import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { User } from '../../../../domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const domainEntity = new User();
    domainEntity.id = raw.id;
    domainEntity.zaloId = raw.zaloId;
    domainEntity.userName = raw.userName;
    domainEntity.phoneNumber = raw.phoneNumber;
    if (raw.avatar) {
      domainEntity.avatar = FileMapper.toDomain(raw.avatar);
    }
    domainEntity.role = raw.role;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserEntity {
    let role: RoleEntity | undefined = undefined;

    if (domainEntity.role) {
      role = new RoleEntity();
      role.id = Number(domainEntity.role.id);
    }

    let photo: FileEntity | undefined | null = undefined;

    if (domainEntity.avatar) {
      photo = new FileEntity();
      photo.id = domainEntity.avatar.id;
      photo.path = domainEntity.avatar.path;
    } else if (domainEntity.avatar === null) {
      photo = null;
    }

    // let status: StatusEntity | undefined = undefined;
    //
    // if (domainEntity.status) {
    //   status = new StatusEntity();
    //   status.id = Number(domainEntity.status.id);
    // }
    //
    const persistenceEntity = new UserEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.zaloId = domainEntity.zaloId;
    persistenceEntity.userName = domainEntity.userName;
    persistenceEntity.phoneNumber = domainEntity.phoneNumber;
    persistenceEntity.avatar = photo;
    persistenceEntity.role = role;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
