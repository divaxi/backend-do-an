import { Appointment } from '../../appointments/domain/appointment';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentService {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  scheduleId: string;

  @ApiProperty({
    type: () => Appointment,
    nullable: false,
  })
  appointment: Appointment;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  serviceId: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  staffId: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
