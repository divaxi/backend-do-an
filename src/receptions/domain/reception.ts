import { Appointment } from '../../appointments/domain/appointment';
import { ApiProperty } from '@nestjs/swagger';

export class Reception {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  note?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  status: string;

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
