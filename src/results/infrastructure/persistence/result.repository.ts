import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Result } from '../../domain/result';

export abstract class ResultRepository {
  abstract create(
    data: Omit<Result, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Result>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Result[]>;

  abstract findById(id: Result['id']): Promise<NullableType<Result>>;

  abstract findByIds(ids: Result['id'][]): Promise<Result[]>;

  abstract update(
    id: Result['id'],
    payload: DeepPartial<Result>,
  ): Promise<Result | null>;

  abstract remove(id: Result['id']): Promise<void>;
}
