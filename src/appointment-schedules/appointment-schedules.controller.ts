import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AppointmentSchedulesService } from './appointment-schedules.service';
// import { CreateAppointmentScheduleDto } from './dto/create-appointment-schedule.dto';
import { UpdateAppointmentScheduleDto } from './dto/update-appointment-schedule.dto';
import {
  ApiBearerAuth,
  // ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AppointmentSchedule } from './domain/appointment-schedule';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAppointmentSchedulesDto } from './dto/find-all-appointment-schedules.dto';

@ApiTags('Appointmentschedules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'appointment-schedules',
  version: '1',
})
export class AppointmentSchedulesController {
  constructor(
    private readonly appointmentSchedulesService: AppointmentSchedulesService,
  ) {}

  // @Post()
  // @ApiCreatedResponse({
  //   type: AppointmentSchedule,
  // })
  // create(@Body() createAppointmentScheduleDto: CreateAppointmentScheduleDto) {
  //   return this.appointmentSchedulesService.create(
  //     createAppointmentScheduleDto,
  //   );
  // }
  //
  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(AppointmentSchedule),
  })
  async findAll(
    @Query() query: FindAllAppointmentSchedulesDto,
  ): Promise<InfinityPaginationResponseDto<AppointmentSchedule>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.appointmentSchedulesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AppointmentSchedule,
  })
  findById(@Param('id') id: string) {
    return this.appointmentSchedulesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AppointmentSchedule,
  })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentScheduleDto: UpdateAppointmentScheduleDto,
  ) {
    return this.appointmentSchedulesService.update(
      id,
      updateAppointmentScheduleDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.appointmentSchedulesService.remove(id);
  }
}
