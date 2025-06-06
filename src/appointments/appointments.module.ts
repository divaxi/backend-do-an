import { ServicesModule } from '../services/services.module';
import { SchedulesModule } from '../schedules/schedules.module';
import { CustomerRecordsModule } from '../customer-records/customer-records.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { RelationalAppointmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
// import { ReceptionsModule } from '../receptions/receptions.module';
// import { AppointmentSchedulesModule } from '../appointment-schedules/appointment-schedules.module';
// import { AppointmentServicesModule } from '../appointment-services/appointment-services.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalAppointmentPersistenceModule,
    ServicesModule,
    SchedulesModule,
    CustomerRecordsModule,
    // ReceptionsModule,
    // AppointmentSchedulesModule,
    // AppointmentServicesModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService, RelationalAppointmentPersistenceModule],
})
export class AppointmentsModule {}
