import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Appointment } from '../../domain/appointment';
import { FindAllAppointmentsDto } from '../../dto/find-all-appointments.dto';
import { AppointmentSatisticDto } from '../../dto/satistic.dto';
import { TimeRangeDto } from '../../dto/time-range.dto';

export abstract class AppointmentRepository {
  abstract create(
    data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Appointment>;

  abstract findAllWithPagination({
    queryOptions,
    paginationOptions,
  }: {
    queryOptions: Omit<FindAllAppointmentsDto, 'limit' | 'page'>;
    paginationOptions: IPaginationOptions;
  }): Promise<Appointment[]>;

  abstract findById(id: Appointment['id']): Promise<NullableType<Appointment>>;

  abstract findByIds(ids: Appointment['id'][]): Promise<Appointment[]>;

  abstract count(timeRange: TimeRangeDto): Promise<AppointmentSatisticDto>;

  abstract update(
    id: Appointment['id'],
    payload: DeepPartial<Appointment>,
  ): Promise<Appointment | null>;

  abstract remove(id: Appointment['id']): Promise<void>;
}
