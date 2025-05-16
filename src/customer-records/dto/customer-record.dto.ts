import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerRecordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
