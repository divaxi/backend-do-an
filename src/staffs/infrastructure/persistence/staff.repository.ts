import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Staff } from '../../domain/staff';

export abstract class StaffRepository {
  abstract create(
    data: Omit<Staff, 'staffId' | 'createdAt' | 'updatedAt'>,
  ): Promise<Staff>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Staff[]>;

  abstract findById(id: Staff['staffId']): Promise<NullableType<Staff>>;

  abstract findByIds(ids: Staff['staffId'][]): Promise<Staff[]>;

  abstract update(
    id: Staff['staffId'],
    payload: DeepPartial<Staff>,
  ): Promise<Staff | null>;

  abstract remove(id: Staff['staffId']): Promise<void>;
}
