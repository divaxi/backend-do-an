import { AppointmentsModule } from '../appointments/appointments.module';
import { SchedulesModule } from '../schedules/schedules.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { AppointmentSchedulesService } from './appointment-schedules.service';
import { AppointmentSchedulesController } from './appointment-schedules.controller';
import { RelationalAppointmentSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    AppointmentsModule,

    SchedulesModule,

    // import modules, etc.
    RelationalAppointmentSchedulePersistenceModule,
  ],
  controllers: [AppointmentSchedulesController],
  providers: [AppointmentSchedulesService],
  exports: [
    AppointmentSchedulesService,
    RelationalAppointmentSchedulePersistenceModule,
  ],
})
export class AppointmentSchedulesModule {}
