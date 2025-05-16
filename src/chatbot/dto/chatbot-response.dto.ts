import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
// import { Transform } from 'class-transformer';
// import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class ChatbotResponseDto {
  @ApiProperty({
    example: 'This is message response from chatbot',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
