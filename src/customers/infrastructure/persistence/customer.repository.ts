import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Customer } from '../../domain/customer';

export abstract class CustomerRepository {
  abstract create(
    data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Customer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Customer[]>;

  abstract findById(id: Customer['id']): Promise<NullableType<Customer>>;

  abstract findByIds(ids: Customer['id'][]): Promise<Customer[]>;

  abstract update(
    id: Customer['id'],
    payload: DeepPartial<Customer>,
  ): Promise<Customer | null>;

  abstract remove(id: Customer['id']): Promise<void>;
}
