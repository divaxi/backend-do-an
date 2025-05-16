import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindByUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: number;
}
