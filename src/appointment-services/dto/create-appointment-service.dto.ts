import { AppointmentDto } from '../../appointments/dto/appointment.dto';

import { ServiceDto } from '../../services/dto/service.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAppointmentServiceDto {
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
    type: () => ServiceDto,
  })
  @ValidateNested()
  @Type(() => ServiceDto)
  @IsNotEmptyObject()
  service: ServiceDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
