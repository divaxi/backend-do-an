import { Module } from '@nestjs/common';
import { ResultRepository } from '../result.repository';
import { ResultRelationalRepository } from './repositories/result.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity])],
  providers: [
    {
      provide: ResultRepository,
      useClass: ResultRelationalRepository,
    },
  ],
  exports: [ResultRepository],
})
export class RelationalResultPersistenceModule {}
