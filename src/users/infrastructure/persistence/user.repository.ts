import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { User } from '../../domain/user';

import { FilterUserDto, SortUserDto } from '../../dto/query-user.dto';

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'userId' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<User>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]>;

  abstract findById(id: User['userId']): Promise<NullableType<User>>;
  abstract findByIds(ids: User['userId'][]): Promise<User[]>;
  abstract findByZaloId(email: User['zaloId']): Promise<NullableType<User>>;
  // abstract findBySocialIdAndProvider({
  //   socialId,
  //   provider,
  // }: {
  //   socialId: User['socialId'];
  //   provider: User['provider'];
  // }): Promise<NullableType<User>>;
  //
  abstract update(
    id: User['userId'],
    payload: DeepPartial<User>,
  ): Promise<User | null>;

  abstract remove(id: User['userId']): Promise<void>;
}
