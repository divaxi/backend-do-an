import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';
// import { Transform } from 'class-transformer';
// import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class MessageDto {
  @ApiProperty({
    example: {
      role: 'user',
      content: 'hahahahhah',
    },
  })
  @IsNotEmpty()
  @IsArray()
  content: {
    role: string;
    content: string;
  }[];

  @ApiProperty({
    description: 'new to get chat context',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  initiate: boolean;
}
