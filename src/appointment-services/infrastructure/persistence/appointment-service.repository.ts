import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AppointmentService } from '../../domain/appointment-service';

export abstract class AppointmentServiceRepository {
  abstract create(
    data: Omit<AppointmentService, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AppointmentService>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AppointmentService[]>;

  abstract findById(
    id: AppointmentService['id'],
  ): Promise<NullableType<AppointmentService>>;

  abstract findByIds(
    ids: AppointmentService['id'][],
  ): Promise<AppointmentService[]>;

  abstract update(
    id: AppointmentService['id'],
    payload: DeepPartial<AppointmentService>,
  ): Promise<AppointmentService | null>;

  abstract remove(id: AppointmentService['id']): Promise<void>;
}
