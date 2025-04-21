import { ApiProperty } from '@nestjs/swagger';

export class Staff {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  note?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  role: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  zaloId?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  phoneNumber: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  fullName: string;

  @ApiProperty({
    type: String,
  })
  staffId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
