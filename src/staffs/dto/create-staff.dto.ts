import {
  // decorators here

  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateStaffDto {
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
  role: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  zaloId?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  fullName: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
