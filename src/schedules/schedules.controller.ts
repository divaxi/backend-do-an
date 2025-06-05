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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Schedule } from './domain/schedule';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSchedulesDto } from './dto/find-all-schedules.dto';
import { FindByDayDto } from './dto/find-by-day.dto';

@ApiTags('Schedules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'schedules',
  version: '1',
})
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Schedule,
  })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Schedule),
  })
  async findAll(
    @Query() query: FindAllSchedulesDto,
  ): Promise<InfinityPaginationResponseDto<Schedule>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    const staffId = query.staffId;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.schedulesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        staffId,
      }),
      { page, limit },
    );
  }

  @Get('by-day')
  @ApiOkResponse({
    isArray: true,
    type: Schedule,
  })
  async findByDay(@Query() query: FindByDayDto) {
    const { date } = query;
    return this.schedulesService.findByDay(date);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Schedule,
  })
  findById(@Param('id') id: string) {
    return this.schedulesService.findById(id);
  }

  @Get('staff/:staffId')
  @ApiParam({
    name: 'staffId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    isArray: true,
    type: Schedule,
  })
  findByStaff(@Param('staffId') staffId: string) {
    return this.schedulesService.findByStaff(staffId);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Schedule,
  })
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }
}
