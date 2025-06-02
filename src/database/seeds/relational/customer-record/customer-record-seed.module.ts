import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRecordEntity } from '../../../../customer-records/infrastructure/persistence/relational/entities/customer-record.entity';
import { CustomerRecordSeedService } from './customer-record-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerRecordEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [CustomerRecordSeedService],
  exports: [CustomerRecordSeedService],
})
export class CustomerRecordSeedModule {}
