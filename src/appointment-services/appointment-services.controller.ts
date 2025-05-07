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
import { AppointmentServicesService } from './appointment-services.service';
// import { CreateAppointmentServiceDto } from './dto/create-appointment-service.dto';
import { UpdateAppointmentServiceDto } from './dto/update-appointment-service.dto';
import {
  ApiBearerAuth,
  // ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AppointmentService } from './domain/appointment-service';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAppointmentServicesDto } from './dto/find-all-appointment-services.dto';

@ApiTags('Appointmentservices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'appointment-services',
  version: '1',
})
export class AppointmentServicesController {
  constructor(
    private readonly appointmentServicesService: AppointmentServicesService,
  ) {}

  // @Post()
  // @ApiCreatedResponse({
  //   type: AppointmentService,
  // })
  // create(@Body() createAppointmentServiceDto: CreateAppointmentServiceDto) {
  //   return this.appointmentServicesService.create(createAppointmentServiceDto);
  // }
  //
  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(AppointmentService),
  })
  async findAll(
    @Query() query: FindAllAppointmentServicesDto,
  ): Promise<InfinityPaginationResponseDto<AppointmentService>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.appointmentServicesService.findAllWithPagination({
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
    type: AppointmentService,
  })
  findById(@Param('id') id: string) {
    return this.appointmentServicesService.findById(id);
  }

  @Get(':staffId')
  @ApiParam({
    name: 'staffId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AppointmentService,
  })
  findAppointmentByStaff(@Param('staffId') staffId: string) {
    return this.appointmentServicesService.findAppointmentByStaff(staffId);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AppointmentService,
  })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentServiceDto: UpdateAppointmentServiceDto,
  ) {
    return this.appointmentServicesService.update(
      id,
      updateAppointmentServiceDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.appointmentServicesService.remove(id);
  }
}
