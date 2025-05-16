import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
// import { Transform } from 'class-transformer';
// import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class MessageDto {
  @ApiProperty({ example: 'Any thing to ask with chat bot', type: String })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'new to get chat context',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  initiate: boolean;
}
