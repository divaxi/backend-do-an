import { AppointmentDto } from '../../appointments/dto/appointment.dto';

import { ScheduleDto } from '../../schedules/dto/schedule.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsDate,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAppointmentScheduleDto {
  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  specificTime: Date;

  @ApiProperty({
    required: true,
    type: () => AppointmentDto,
  })
  @ValidateNested()
  @Type(() => AppointmentDto)
  @IsNotEmptyObject()
  appointment: AppointmentDto;

  @ApiProperty({
    required: true,
    type: () => ScheduleDto,
  })
  @ValidateNested()
  @Type(() => ScheduleDto)
  @IsNotEmptyObject()
  schedule: ScheduleDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
