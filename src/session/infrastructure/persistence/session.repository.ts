import { User } from '../../../users/domain/user';
import { NullableType } from '../../../utils/types/nullable.type';
import { Session } from '../../domain/session';

export abstract class SessionRepository {
  abstract findById(id: Session['id']): Promise<NullableType<Session>>;

  abstract create(
    data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Session>;

  abstract update(
    id: Session['id'],
    payload: Partial<
      Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Session | null>;

  abstract deleteById(id: Session['id']): Promise<void>;

  abstract deleteByUserId(conditions: {
    userId: User['userId'];
  }): Promise<void>;

  abstract deleteByUserIdWithExclude(conditions: {
    userId: User['userId'];
    excludeSessionId: Session['id'];
  }): Promise<void>;
}
