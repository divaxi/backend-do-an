import { Appointment } from '../../appointments/domain/appointment';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../status.enum';

export class Reception {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  note?: string | null;

  @ApiProperty({
    enum: StatusEnum,
    enumName: 'StatusEnum',
    description: 'Status of the appointment (1 = notCheckin, 2 = checkin)',
    example: 1,
  })
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  checkinTime?: Date | null;

  @ApiProperty({
    type: () => Appointment,
    nullable: false,
  })
  Appointment: Appointment;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
