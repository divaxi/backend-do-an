import { StaffDto } from '../../staffs/dto/staff.dto';

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
  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  note?: string | null;

  active?: boolean;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endTime: Date;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startTime: Date;

  @ApiProperty({
    required: true,
    type: () => StaffDto,
  })
  @ValidateNested()
  @Type(() => StaffDto)
  @IsNotEmptyObject()
  staff: StaffDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
