import { Module } from '@nestjs/common';
import { CustomerRepository } from '../customer.repository';
import { CustomerRelationalRepository } from './repositories/customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [
    {
      provide: CustomerRepository,
      useClass: CustomerRelationalRepository,
    },
  ],
  exports: [CustomerRepository],
})
export class RelationalCustomerPersistenceModule {}
