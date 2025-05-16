import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
// import { Transform } from 'class-transformer';
// import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthZaloLoginDto {
  @ApiProperty({ example: '1231234', type: String })
  @IsNotEmpty()
  zaloAccessToken: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // password: string;
}
