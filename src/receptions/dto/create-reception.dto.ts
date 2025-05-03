import { AppointmentDto } from '../../appointments/dto/appointment.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsDate,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateReceptionDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  note?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  status: string;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  checkinTime?: Date | null;

  @ApiProperty({
    required: true,
    type: () => AppointmentDto,
  })
  @ValidateNested()
  @Type(() => AppointmentDto)
  @IsNotEmptyObject()
  Appointment: AppointmentDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
