import { Expose } from 'class-transformer';
import { Role } from '../../roles/domain/role';
import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../../files/domain/file';

const idType = Number;

export class User {
  @ApiProperty({
    type: idType,
  })
  id: number;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  @Expose({ groups: ['me', 'admin'] })
  zaloId?: string | null;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  phoneNumber: string | null;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  userName: string | null;

  @ApiProperty({
    type: () => FileType,
    example: 'avatar image link',
  })
  avatar: FileType | null;

  @ApiProperty({
    type: () => Role,
  })
  role?: Role | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
