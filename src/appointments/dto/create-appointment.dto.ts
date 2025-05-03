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
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

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
    required: true,
    type: () => CustomerRecordDto,
  })
  @ValidateNested()
  @Type(() => CustomerRecordDto)
  @IsNotEmptyObject()
  customerRecord: CustomerRecordDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
