import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AppointmentSatisticDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
