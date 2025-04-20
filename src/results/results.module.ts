import {
  // common
  Module,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { RelationalResultPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalResultPersistenceModule,
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService, RelationalResultPersistenceModule],
})
export class ResultsModule {}
