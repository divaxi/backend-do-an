import { SchedulesModule } from '../schedules/schedules.module';
import { AppointmentsModule } from '../appointments/appointments.module';
import { ServicesModule } from '../services/services.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { AppointmentServicesService } from './appointment-services.service';
import { AppointmentServicesController } from './appointment-services.controller';
import { RelationalAppointmentServicePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SchedulesModule,

    AppointmentsModule,

    ServicesModule,

    // import modules, etc.
    RelationalAppointmentServicePersistenceModule,
  ],
  controllers: [AppointmentServicesController],
  providers: [AppointmentServicesService],
  exports: [
    AppointmentServicesService,
    RelationalAppointmentServicePersistenceModule,
  ],
})
export class AppointmentServicesModule {}
