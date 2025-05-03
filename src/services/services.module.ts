import { FilesModule } from '../files/files.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { RelationalServicePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    FilesModule,

    // import modules, etc.
    RelationalServicePersistenceModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService, RelationalServicePersistenceModule],
})
export class ServicesModule {}
