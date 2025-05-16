// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateReceptionDto } from './create-reception.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusEnum } from '../status.enum';

export class UpdateReceptionDto extends PartialType(CreateReceptionDto) {
  @ApiPropertyOptional({
    enum: StatusEnum,
    enumName: 'StatusEnum',
    description: 'Status of the appointment (1 = notCheckin, 2 = checkin)',
    example: 1,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
