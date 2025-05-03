import { CustomerRecordDto } from '../../customer-records/dto/customer-record.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { AppointmentScheduleDto } from '../../appointment-schedules/dto/appointment-schedule.dto';

export class CreateAppointmentDto {
  active?: boolean;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  note?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['serviceId 1', 'serviceId 2'],
  })
  @IsString({ each: true })
  @ArrayMinSize(1)
  serviceIds: string[];

  @ApiProperty({
    type: () => AppointmentScheduleDto,
    isArray: true,
    example: [{ id: 'id', specificTime: new Date() }],
  })
  @ArrayMinSize(1)
  schedules: AppointmentScheduleDto[];

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
