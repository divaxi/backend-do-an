import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Reception } from '../../domain/reception';

export abstract class ReceptionRepository {
  abstract create(
    data: Omit<Reception, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Reception>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Reception[]>;

  abstract findById(id: Reception['id']): Promise<NullableType<Reception>>;

  abstract findByIds(ids: Reception['id'][]): Promise<Reception[]>;

  abstract update(
    id: Reception['id'],
    payload: DeepPartial<Reception>,
  ): Promise<Reception | null>;

  abstract remove(id: Reception['id']): Promise<void>;
}
