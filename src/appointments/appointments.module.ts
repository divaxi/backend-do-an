import { CustomerRecordsModule } from '../customer-records/customer-records.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { RelationalAppointmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    CustomerRecordsModule,

    // import modules, etc.
    RelationalAppointmentPersistenceModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService, RelationalAppointmentPersistenceModule],
})
export class AppointmentsModule {}
