import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerRecord {
  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  active?: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  BHYTNumber?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CCCDNumber?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  DOB: Date;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  sex: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  fullName: string;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user?: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
