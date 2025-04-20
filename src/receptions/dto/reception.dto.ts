import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReceptionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
