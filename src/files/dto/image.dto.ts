import { IsOptional, IsString } from 'class-validator';

export class ImageDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  path?: string;
}
