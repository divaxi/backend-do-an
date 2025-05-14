import { UsersModule } from '../users/users.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RelationalMessagePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

    // import modules, etc.
    RelationalMessagePersistenceModule,
  ],
  // controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService, RelationalMessagePersistenceModule],
})
export class MessagesModule {}
