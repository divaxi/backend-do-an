import { CustomerRecord } from '../../customer-records/domain/customer-record';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class Appointment {
  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  specificTime: Date;

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
    enum: StatusEnum,
    enumName: 'StatusEnum',
    description:
      'Status of the appointment (1 = pending, 2 = inprogress, 3 = done)',
    example: 1,
  })
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;

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
