import { ServiceDto } from '../../services/dto/service.dto';

import { ScheduleDto } from '../../schedules/dto/schedule.dto';

import { CustomerRecordDto } from '../../customer-records/dto/customer-record.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    required: true,
    type: () => ServiceDto,
  })
  @ValidateNested()
  @Type(() => ServiceDto)
  @IsNotEmptyObject()
  service: ServiceDto;

  @ApiProperty({
    required: true,
    type: () => ScheduleDto,
  })
  @ValidateNested()
  @Type(() => ScheduleDto)
  @IsNotEmptyObject()
  schedule: ScheduleDto;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  specificTime: Date;

  active?: boolean;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  note?: string | null;

  @ApiProperty({
    required: true,
    type: () => CustomerRecordDto,
  })
  @ValidateNested()
  @Type(() => CustomerRecordDto)
  @IsNotEmptyObject()
  customerRecord: CustomerRecordDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
