import {
  // common
  Module,
} from '@nestjs/common';
import { CustomerRecordsService } from './customer-records.service';
import { CustomerRecordsController } from './customer-records.controller';
import { RelationalCustomerRecordPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalCustomerRecordPersistenceModule,
  ],
  controllers: [CustomerRecordsController],
  providers: [CustomerRecordsService],
  exports: [CustomerRecordsService, RelationalCustomerRecordPersistenceModule],
})
export class CustomerRecordsModule {}
