import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Schedule } from '../../domain/schedule';

export abstract class ScheduleRepository {
  abstract create(
    data: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Schedule>;

  abstract bulkCreate(
    data: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Schedule[]>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Schedule[]>;

  abstract findById(id: Schedule['id']): Promise<NullableType<Schedule>>;

  abstract findByIds(ids: Schedule['id'][]): Promise<Schedule[]>;

  abstract findByDay(day: Date): Promise<Schedule[]>;

  abstract findByStaff(staffId: string, day?: Date): Promise<Schedule[]>;

  abstract update(
    id: Schedule['id'],
    payload: DeepPartial<Schedule>,
  ): Promise<Schedule | null>;

  abstract remove(id: Schedule['id']): Promise<void>;
}
