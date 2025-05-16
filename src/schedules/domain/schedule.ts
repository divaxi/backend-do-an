import { Staff } from '../../staffs/domain/staff';
import { ApiProperty } from '@nestjs/swagger';

export class Schedule {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  note?: string | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  active?: boolean;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  endTime: Date;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  startTime: Date;

  @ApiProperty({
    type: () => Staff,
    nullable: false,
  })
  staff: Staff;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
