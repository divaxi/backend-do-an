import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRecordEntity } from '../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';
import { CustomerRecordSeedService } from './customer-record-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRecordEntity])],
  providers: [CustomerRecordSeedService],
  exports: [CustomerRecordSeedService],
})
export class CustomerRecordSeedModule {}
