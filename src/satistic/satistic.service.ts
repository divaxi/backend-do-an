import { Injectable, BadRequestException } from '@nestjs/common';
import { AppointmentsService } from '../appointments/appointments.service';
import {
  EnumerateByEnum,
  EnumerateCountAppointmentDto,
} from './dto/count-order.dto';
@Injectable()
export class SatisticService {
  constructor(private readonly appointmentService: AppointmentsService) {}

  async countOrderByTime(searchQuery: EnumerateCountAppointmentDto) {
    switch (searchQuery.enumerateBy) {
      case EnumerateByEnum.DAY:
        return this.appointmentService.countDayByDay(searchQuery);
      case EnumerateByEnum.MONTH:
        return this.appointmentService.countMonthByMonth(searchQuery);
      case EnumerateByEnum.YEAR:
        return this.appointmentService.countYearByYear(searchQuery);
      default:
        throw new BadRequestException('Invalid enumerateBy');
    }
  }
}
