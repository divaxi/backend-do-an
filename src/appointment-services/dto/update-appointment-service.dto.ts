// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentServiceDto } from './create-appointment-service.dto';

export class UpdateAppointmentServiceDto extends PartialType(
  CreateAppointmentServiceDto,
) {}
