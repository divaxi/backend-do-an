import {
  // common
  Module,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { RelationalCustomerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalCustomerPersistenceModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService, RelationalCustomerPersistenceModule],
})
export class CustomersModule {}
