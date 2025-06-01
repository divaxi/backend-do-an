import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { MessagesModule } from '../messages/messages.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ConfigModule, MessagesModule, ServicesModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
