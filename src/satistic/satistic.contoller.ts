import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SatisticService } from './satistic.service';
import { EnumerateCountAppointmentDto } from './dto/count-order.dto';
import { EnumerateResponseDto } from './dto/satistic.dto';

@ApiTags('Satistic')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'satistic',
  version: '1',
})
export class SatisticController {
  constructor(private readonly satisticService: SatisticService) {}

  @Get('count-order')
  @ApiOkResponse({
    type: EnumerateResponseDto,
  })
  countOrderByTime(@Query() query: EnumerateCountAppointmentDto) {
    return this.satisticService.countOrderByTime(query);
  }
}
