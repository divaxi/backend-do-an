import {
  // decorators here

  IsString,
  IsNotEmpty,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    example: 'https://example.com/path/to/file.jpg',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  path: string;
  // Don't forget to use the class-validator decorators in the DTO properties.
}
