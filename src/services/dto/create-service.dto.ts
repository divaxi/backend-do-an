import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';
import { ImageDto } from '../../files/dto/image.dto';

export class CreateServiceDto {
  @ApiProperty({
    required: false,
    type: () => ImageDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageDto)
  @IsNotEmptyObject()
  image?: ImageDto | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  price?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  serviceName: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
