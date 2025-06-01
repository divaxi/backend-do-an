import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

export enum EnumerateByEnum {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export class EnumerateCountAppointmentDto {
  @ApiPropertyOptional()
  @IsEnum(EnumerateByEnum)
  @IsOptional()
  enumerateBy: EnumerateByEnum;

  @ApiProperty()
  @Transform(({ value }) =>
    value instanceof Date ? value : startOfDay(parseISO(value)),
  )
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @Transform(({ value }) =>
    value instanceof Date ? value : endOfDay(parseISO(value)),
  )
  @IsDate()
  endDate: Date;
}
