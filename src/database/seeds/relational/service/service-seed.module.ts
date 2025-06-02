import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '../../../../services/infrastructure/persistence/relational/entities/service.entity';
import { ServiceSeedService } from './service-seed.service';
import { FileEntity } from '../../../../files/infrastructure/persistence/relational/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceEntity]),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  providers: [ServiceSeedService],
  exports: [ServiceSeedService],
})
export class ServiceSeedModule {}
