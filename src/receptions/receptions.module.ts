import { AppointmentsModule } from '../appointments/appointments.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { ReceptionsService } from './receptions.service';
import { ReceptionsController } from './receptions.controller';
import { RelationalReceptionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    AppointmentsModule,

    // import modules, etc.
    RelationalReceptionPersistenceModule,
  ],
  controllers: [ReceptionsController],
  providers: [ReceptionsService],
  exports: [ReceptionsService, RelationalReceptionPersistenceModule],
})
export class ReceptionsModule {}
