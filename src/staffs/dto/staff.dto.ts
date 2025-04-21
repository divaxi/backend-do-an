import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StaffDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  staffId: string;
}
