import {
  // common
  Module,
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { RelationalStaffPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalStaffPersistenceModule,
  ],
  controllers: [StaffsController],
  providers: [StaffsService],
  exports: [StaffsService, RelationalStaffPersistenceModule],
})
export class StaffsModule {}
