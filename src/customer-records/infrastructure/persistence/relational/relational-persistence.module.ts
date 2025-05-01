import { Module } from '@nestjs/common';
import { CustomerRecordRepository } from '../customer-record.repository';
import { CustomerRecordRelationalRepository } from './repositories/customer-record.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRecordEntity } from './entities/customer-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRecordEntity])],
  providers: [
    {
      provide: CustomerRecordRepository,
      useClass: CustomerRecordRelationalRepository,
    },
  ],
  exports: [CustomerRecordRepository],
})
export class RelationalCustomerRecordPersistenceModule {}
