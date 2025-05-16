import {
  // decorators here
  Type,
} from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';

export class CreateUserDto {
  // @ApiProperty({ example: 'test1@example.com', type: String })
  // @Transform(lowerCaseTransformer)
  // @IsNotEmpty()
  // @IsEmail()
  // email: string | null;

  // @ApiProperty()
  // @MinLength(6)
  // password?: string;

  // provider?: string;

  zaloId?: string | null;

  @ApiProperty({ example: '1234567890', type: String })
  @IsNotEmpty()
  phoneNumber: string | null;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  userName: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  avatar?: FileDto | null;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  // @ApiPropertyOptional({ type: StatusDto })
  // @IsOptional()
  // @Type(() => StatusDto)
  // status?: StatusDto;
}
