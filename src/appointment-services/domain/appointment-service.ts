import { Appointment } from '../../appointments/domain/appointment';
import { Service } from '../../services/domain/service';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentService {
  @ApiProperty({
    type: () => Appointment,
    nullable: false,
  })
  appointment: Appointment;

  @ApiProperty({
    type: () => Service,
    nullable: false,
  })
  service: Service;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
