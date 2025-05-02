import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class Staff {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  note?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  specialization?: string | null;

  @ApiProperty({
    type: String,
  })
  staffId: string;

  @ApiProperty({
    type: () => User,
    example: 'userId',
  })
  user: User | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
