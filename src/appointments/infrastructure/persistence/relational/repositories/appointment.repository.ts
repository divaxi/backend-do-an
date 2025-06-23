import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import { AppointmentEntity } from '../entities/appointment.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Appointment } from '../../../../domain/appointment';
import { AppointmentRepository } from '../../appointment.repository';
import { AppointmentMapper } from '../mappers/appointment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FindAllAppointmentsDto } from '../../../../dto/find-all-appointments.dto';
import { AppointmentSatisticDto } from '../../../../dto/satistic.dto';
import { TimeRangeDto } from '../../../../dto/time-range.dto';
import { EnumerateCountAppointmentDto } from '../../../../../satistic/dto/count-order.dto';
import { EnumerateResponseDto } from '../../../../../satistic/dto/satistic.dto';
import { format } from 'date-fns';

@Injectable()
export class AppointmentRelationalRepository implements AppointmentRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async create(data: Appointment): Promise<Appointment> {
    const persistenceModel = AppointmentMapper.toPersistence(data);
    const newEntity = await this.appointmentRepository.save(
      this.appointmentRepository.create(persistenceModel),
    );
    return AppointmentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    queryOptions,
    paginationOptions,
  }: {
    queryOptions: Omit<FindAllAppointmentsDto, 'page' | 'limit'>;
    paginationOptions: IPaginationOptions;
  }): Promise<Appointment[]> {
    const { userId, status, startTime, endTime } = queryOptions;

    const where: any = {
      customerRecord: {
        user: {
          id: userId,
        },
      },
      active: true,
    };

    if (status) {
      where.status = status;
    }

    if (startTime && endTime) {
      where.specificTime = Between(startTime, endTime);
    }

    const entities = await this.appointmentRepository.find({
      where,
      order: { specificTime: 'DESC' },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AppointmentMapper.toDomain(entity));
  }

  async findByStaffId({
    staffId,
    page,
    limit,
  }: {
    staffId: string;
    page: number;
    limit: number;
  }): Promise<Appointment[]> {
    const entities = await this.appointmentRepository.find({
      where: { schedule: { staff: { id: staffId }, active: true } },
      order: { specificTime: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return entities.map((entity) => AppointmentMapper.toDomain(entity));
  }

  async findById(id: Appointment['id']): Promise<NullableType<Appointment>> {
    const entity = await this.appointmentRepository.findOne({
      where: { id },
    });

    return entity ? AppointmentMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Appointment['id'][]): Promise<Appointment[]> {
    const entities = await this.appointmentRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AppointmentMapper.toDomain(entity));
  }

  async count(timeRange: TimeRangeDto): Promise<AppointmentSatisticDto> {
    const count = await this.appointmentRepository.count({
      where: { specificTime: Between(timeRange.startTime, timeRange.endTime) },
    });
    return { count };
  }

  async countByCustomer(
    timeRange: TimeRangeDto,
  ): Promise<AppointmentSatisticDto> {
    const count = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoin('appointment.customerRecord', 'customerRecord')
      .where('appointment.specificTime BETWEEN :start AND :end', {
        start: timeRange.startTime,
        end: timeRange.endTime,
      })
      .select('COUNT(DISTINCT customerRecord.id)', 'count')
      .getRawOne();

    return { count: parseInt(count.count, 10) };
  }

  async countDayByDay(
    query: EnumerateCountAppointmentDto,
  ): Promise<EnumerateResponseDto> {
    const result = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('DATE(appointment.specificTime)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('appointment.specificTime BETWEEN :start AND :end', {
        start: query.startDate,
        end: query.endDate,
      })
      .groupBy('DATE(appointment.specificTime)')
      .orderBy('DATE(appointment.specificTime)', 'ASC')
      .getRawMany();

    const countsByDate = new Map<string, number>();
    result.forEach((r) => {
      countsByDate.set(r.date, parseInt(r.count));
    });

    const allDates: EnumerateResponseDto = {
      data: [],
    };
    const current = new Date(query.startDate);
    const end = new Date(query.endDate);

    while (current <= end) {
      const dateStr = format(current, 'yyyy-MM-dd');
      allDates.data.push({
        day: dateStr,
        count: countsByDate.get(dateStr) || 0,
      });
      current.setDate(current.getDate() + 1);
    }

    return allDates;
  }

  async countMonthByMonth(
    query: EnumerateCountAppointmentDto,
  ): Promise<EnumerateResponseDto> {
    const result = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select("TO_CHAR(appointment.specificTime, 'YYYY-MM')", 'month')
      .addSelect('COUNT(*)', 'count')
      .where('appointment.specificTime BETWEEN :start AND :end', {
        start: query.startDate,
        end: query.endDate,
      })
      .groupBy("TO_CHAR(appointment.specificTime, 'YYYY-MM')")
      .orderBy("TO_CHAR(appointment.specificTime, 'YYYY-MM')", 'ASC')
      .getRawMany();

    const countsByMonth = new Map<string, number>();
    result.forEach((r) => {
      countsByMonth.set(r.month, parseInt(r.count));
    });

    const allMonths: EnumerateResponseDto = {
      data: [],
    };
    const current = new Date(query.startDate);
    const end = new Date(query.endDate);

    while (current <= end) {
      const monthStr = format(current, 'yyyy-MM');
      allMonths.data.push({
        month: monthStr,
        count: countsByMonth.get(monthStr) || 0,
      });
      current.setMonth(current.getMonth() + 1);
    }

    return allMonths;
  }

  async countYearByYear(
    query: EnumerateCountAppointmentDto,
  ): Promise<EnumerateResponseDto> {
    const result = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select("TO_CHAR(appointment.specificTime, 'YYYY')", 'year')
      .addSelect('COUNT(*)', 'count')
      .where('appointment.specificTime BETWEEN :start AND :end', {
        start: query.startDate,
        end: query.endDate,
      })
      .groupBy("TO_CHAR(appointment.specificTime, 'YYYY')")
      .orderBy("TO_CHAR(appointment.specificTime, 'YYYY')", 'ASC')
      .getRawMany();

    const countsByYear = new Map<string, number>();
    result.forEach((r) => {
      countsByYear.set(r.year, parseInt(r.count));
    });

    const allYears: EnumerateResponseDto = {
      data: [],
    };
    const current = new Date(query.startDate);
    const end = new Date(query.endDate);

    while (current <= end) {
      const yearStr = format(current, 'yyyy');
      allYears.data.push({
        year: yearStr,
        count: countsByYear.get(yearStr) || 0,
      });
      current.setFullYear(current.getFullYear() + 1);
    }

    return allYears;
  }

  async update(
    id: Appointment['id'],
    payload: Partial<Appointment>,
  ): Promise<Appointment> {
    const entity = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.appointmentRepository.save(
      this.appointmentRepository.create(
        AppointmentMapper.toPersistence({
          ...AppointmentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AppointmentMapper.toDomain(updatedEntity);
  }

  async remove(id: Appointment['id']): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}
