import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  Transform,
} from 'class-transformer';
import { parseISO } from 'date-fns';

export class CreateCustomerRecordDto {
  active?: boolean;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  BHYTNumber?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  CCCDNumber?: string | null;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => parseISO(value))
  @IsDate()
  DOB: Date;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  sex: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  fullName: string;

  user?: UserDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
