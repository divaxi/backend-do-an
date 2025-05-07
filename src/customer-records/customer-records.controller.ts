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
  Req,
} from '@nestjs/common';
import { CustomerRecordsService } from './customer-records.service';
import { CreateCustomerRecordDto } from './dto/create-customer-record.dto';
import { UpdateCustomerRecordDto } from './dto/update-customer-record.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CustomerRecord } from './domain/customer-record';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllCustomerRecordsDto } from './dto/find-all-customer-records.dto';

@ApiTags('Customerrecords')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'customer-records',
  version: '1',
})
export class CustomerRecordsController {
  constructor(
    private readonly customerRecordsService: CustomerRecordsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: () => CustomerRecord,
  })
  create(@Body() createCustomerRecordDto: CreateCustomerRecordDto, @Req() req) {
    const userId = req.user.id;
    return this.customerRecordsService.create(createCustomerRecordDto, userId);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(CustomerRecord),
  })
  async findAll(
    @Query() query: FindAllCustomerRecordsDto,
  ): Promise<InfinityPaginationResponseDto<CustomerRecord>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.customerRecordsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':userId')
  @ApiParam({
    name: 'userId',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: () => [CustomerRecord],
  })
  async findByUser(@Param('userId') userId: number): Promise<CustomerRecord[]> {
    return await this.customerRecordsService.findByUser(userId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: () => CustomerRecord,
  })
  findById(@Param('id') id: string) {
    return this.customerRecordsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: () => CustomerRecord,
  })
  update(
    @Param('id') id: string,
    @Body() updateCustomerRecordDto: UpdateCustomerRecordDto,
  ) {
    return this.customerRecordsService.update(id, updateCustomerRecordDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.customerRecordsService.remove(id);
  }
}
