import { Staff } from '../../staffs/domain/staff';
import { CustomerRecord } from '../../customer-records/domain/customer-record';
import { ApiProperty } from '@nestjs/swagger';

export class Appointment {
  @ApiProperty({
    type: () => Staff,
    nullable: false,
  })
  staff: Staff;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  active?: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  note?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  status?: string;

  @ApiProperty({
    type: () => CustomerRecord,
    nullable: false,
  })
  customerRecord: CustomerRecord;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
