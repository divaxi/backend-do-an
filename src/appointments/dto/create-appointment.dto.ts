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
  ArrayMinSize,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

class ServiceScheduleDto {
  @ApiProperty({
    required: true,
    type: () => String,
    example: 'serviceId',
  })
  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @ApiProperty({
    required: true,
    type: () => String,
    example: 'scheduleId',
  })
  @IsNotEmpty()
  @IsString()
  scheduleId: string;

  @ApiProperty({
    required: true,
    type: () => String,
    example: 'staffId',
  })
  @IsNotEmpty()
  @IsString()
  staffId: string;
}

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
    type: () => ServiceScheduleDto,
    isArray: true,
  })
  @ArrayMinSize(1)
  serviceAndScheduleIds: ServiceScheduleDto[];

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
