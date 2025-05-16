// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { StatusEnum } from '../status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @ApiProperty({
    enum: StatusEnum,
    enumName: 'StatusEnum',
    description:
      'Status of the appointment (1 = pending, 2 = inprogress, 3 = done)',
    example: 1,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
