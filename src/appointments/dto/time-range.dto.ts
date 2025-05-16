import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class TimeRangeDto {
  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startTime: Date;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endTime: Date;
}
