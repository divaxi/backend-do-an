import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllAppointmentsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  startTime?: Date;

  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  endTime?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;
}
