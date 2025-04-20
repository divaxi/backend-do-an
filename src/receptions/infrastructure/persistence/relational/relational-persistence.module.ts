import { Module } from '@nestjs/common';
import { ReceptionRepository } from '../reception.repository';
import { ReceptionRelationalRepository } from './repositories/reception.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptionEntity } from './entities/reception.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceptionEntity])],
  providers: [
    {
      provide: ReceptionRepository,
      useClass: ReceptionRelationalRepository,
    },
  ],
  exports: [ReceptionRepository],
})
export class RelationalReceptionPersistenceModule {}
