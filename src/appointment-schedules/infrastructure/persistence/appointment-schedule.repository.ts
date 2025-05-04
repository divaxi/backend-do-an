import { Schedule } from '../../../schedules/domain/schedule';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AppointmentSchedule } from '../../domain/appointment-schedule';

export abstract class AppointmentScheduleRepository {
  abstract create(
    data: Omit<AppointmentSchedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AppointmentSchedule>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AppointmentSchedule[]>;

  abstract findById(
    id: AppointmentSchedule['id'],
  ): Promise<NullableType<AppointmentSchedule>>;

  abstract findByIds(
    ids: AppointmentSchedule['id'][],
  ): Promise<AppointmentSchedule[]>;

  abstract findBySchedule(schedule: Schedule): Promise<AppointmentSchedule[]>;

  abstract update(
    id: AppointmentSchedule['id'],
    payload: DeepPartial<AppointmentSchedule>,
  ): Promise<AppointmentSchedule | null>;

  abstract remove(id: AppointmentSchedule['id']): Promise<void>;
}
