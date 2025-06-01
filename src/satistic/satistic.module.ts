import {
  // common
  Module,
} from '@nestjs/common';
import { AppointmentsModule } from '../appointments/appointments.module';
import { SatisticService } from './satistic.service';
import { SatisticController } from './satistic.contoller';
@Module({
  imports: [
    // import modules, etc.
    AppointmentsModule,
  ],
  providers: [SatisticService],
  exports: [SatisticService],
  controllers: [SatisticController],
})
export class SatisticModule {}
