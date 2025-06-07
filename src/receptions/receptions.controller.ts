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
import { ReceptionsService } from './receptions.service';
import { CreateReceptionDto } from './dto/create-reception.dto';
// import { UpdateReceptionDto } from './dto/update-reception.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Reception } from './domain/reception';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllReceptionsDto } from './dto/find-all-receptions.dto';

@ApiTags('Receptions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'receptions',
  version: '1',
})
export class ReceptionsController {
  constructor(private readonly receptionsService: ReceptionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Reception,
  })
  create(@Body() createReceptionDto: CreateReceptionDto) {
    return this.receptionsService.create(createReceptionDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Reception),
  })
  async findAll(
    @Query() query: FindAllReceptionsDto,
  ): Promise<InfinityPaginationResponseDto<Reception>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.receptionsService.findAllWithPagination({
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
    type: Reception,
  })
  findById(@Param('id') id: string) {
    return this.receptionsService.findById(id);
  }

  @Get('appointment/:appointmentId')
  @ApiParam({
    name: 'appointmentId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Reception,
  })
  findByAppointment(@Param('appointmentId') appointmentId: string) {
    return this.receptionsService.findByAppointment(appointmentId);
  }

  @Patch('checkin/:id/:appointmentId')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'ID của reception cần check-in',
  })
  @ApiParam({
    name: 'appointmentId',
    type: String,
    required: true,
    description: 'ID của cuộc hẹn liên quan đến reception',
  })
  @ApiOkResponse({
    description: 'Check-in thành công',
    type: Reception,
  })
  checkin(
    @Param('id') id: string,
    @Param('appointmentId') appointmentId: string,
  ) {
    return this.receptionsService.checkin(id, appointmentId);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.receptionsService.remove(id);
  }
}
