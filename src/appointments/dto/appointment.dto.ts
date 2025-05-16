import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
