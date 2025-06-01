import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';
import { parseISO } from 'date-fns';

export class FindByDayDto {
  @ApiProperty()
  @Transform(({ value }) => parseISO(value))
  @IsDate()
  date: Date;
}
