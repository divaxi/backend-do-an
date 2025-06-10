// file: message.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class MessageContentDto {
  @ApiProperty({ example: 'user' })
  @IsString()
  role: string;

  @ApiProperty({ example: 'hahahahhah' })
  @IsString()
  content: string;
}

export class MessageDto {
  @ApiProperty({
    description: 'Danh sách nội dung tin nhắn của user',
    type: [MessageContentDto],
    example: [
      {
        role: 'user',
        content: 'hahahahhah',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageContentDto)
  content: MessageContentDto[];

  @ApiProperty({
    description: 'Dùng để xác định có lấy lịch sử tin nhắn không',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  initiate: boolean;
}
