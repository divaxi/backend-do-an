import { Appointment } from '../../appointments/domain/appointment';
import { Schedule } from '../../schedules/domain/schedule';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentSchedule {
  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  specificTime: Date;

  @ApiProperty({
    type: () => Appointment,
    nullable: false,
  })
  appointment: Appointment;

  @ApiProperty({
    type: () => Schedule,
    nullable: false,
  })
  schedule: Schedule;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
