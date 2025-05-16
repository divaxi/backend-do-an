import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  role: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  content: string;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
