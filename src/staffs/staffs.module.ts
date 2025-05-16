import {
  // common
  Module,
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { RelationalStaffPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    // import modules, etc.
    RelationalStaffPersistenceModule,
    UsersModule,
  ],
  controllers: [StaffsController],
  providers: [StaffsService],
  exports: [StaffsService, RelationalStaffPersistenceModule],
})
export class StaffsModule {}
