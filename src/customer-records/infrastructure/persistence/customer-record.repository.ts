import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { CustomerRecord } from '../../domain/customer-record';

export abstract class CustomerRecordRepository {
  abstract create(
    data: Omit<CustomerRecord, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CustomerRecord>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CustomerRecord[]>;

  abstract findById(
    id: CustomerRecord['id'],
  ): Promise<NullableType<CustomerRecord>>;

  abstract findByIds(ids: CustomerRecord['id'][]): Promise<CustomerRecord[]>;

  abstract update(
    id: CustomerRecord['id'],
    payload: DeepPartial<CustomerRecord>,
  ): Promise<CustomerRecord | null>;

  abstract remove(id: CustomerRecord['id']): Promise<void>;
}
