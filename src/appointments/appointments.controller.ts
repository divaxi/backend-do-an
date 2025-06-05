import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Appointment } from './domain/appointment';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAppointmentsDto } from './dto/find-all-appointments.dto';
import { AppointmentSatisticDto } from './dto/satistic.dto';
import { TimeRangeDto } from './dto/time-range.dto';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'appointments',
  version: '1',
})
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Appointment,
  })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Appointment),
  })
  async findAll(
    @Query() query: FindAllAppointmentsDto,
  ): Promise<InfinityPaginationResponseDto<Appointment>> {
    const startTime = query?.startTime;
    const endTime = query?.endTime;
    const status = query?.status;
    const userId = query.userId;
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.appointmentsService.findAllWithPagination({
        queryOptions: {
          startTime,
          endTime,
          status,
          userId,
        },
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('countCustomer')
  @ApiOkResponse({
    type: AppointmentSatisticDto,
  })
  countByCustomer(@Query() query: TimeRangeDto) {
    return this.appointmentsService.countByCustomer(query);
  }

  @Get('count')
  @ApiOkResponse({
    type: AppointmentSatisticDto,
  })
  count(@Query() query: TimeRangeDto) {
    return this.appointmentsService.count(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Appointment,
  })
  findById(@Param('id') id: string) {
    return this.appointmentsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Appointment,
  })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
