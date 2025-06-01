import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { MessageDto } from './dto/message.dto';
import { ChatbotResponseDto } from './dto/chatbot-response.dto';
import OpenAI from 'openai';
import { MessagesService } from '../messages/messages.service';
import { User } from '../users/domain/user';
import { Message } from '../messages/domain/message';
import { ServicesService } from '../services/services.service';

@Injectable()
export class ChatbotService implements OnModuleInit {
  private readonly openai: OpenAI;
  private readonly model: string;
  private readonly baseSystemPrompt: string;
  private serviceSummary = '';

  constructor(
    private configService: ConfigService<AllConfigType>,
    private messageService: MessagesService,
    private serviceService: ServicesService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('openAI.openAISecretKey', {
        infer: true,
      }),
    });

    this.model = this.configService.getOrThrow<string>('openAI.openAIModel', {
      infer: true,
    });
    this.baseSystemPrompt = this.configService.getOrThrow<string>(
      'openAI.systemPrompt',
      { infer: true },
    );
  }

  async onModuleInit() {
    await this.updateServiceSummary();
  }

  private async updateServiceSummary() {
    const services = await this.serviceService.findAllWithPagination({
      paginationOptions: { page: 1, limit: 999 },
    });

    this.serviceSummary = services.map((s) => s.description).join('\n');
  }

  private buildSystemPrompt(): string {
    return `${this.baseSystemPrompt}\n\nThông tin dịch vụ hiện tại:\n${this.serviceSummary}`;
  }

  private async buildFormattedMessages(
    user: User,
    userInput: {
      role: string;
      content: string;
    }[],
    initiate: boolean,
  ) {
    let messages: Message[] = [];

    if (initiate) {
      messages = await this.messageService.findByUser(user.id);
    }

    const userMessage = await this.messageService.create({
      role: 'user',
      content: userInput[-1].content,
      user,
    });

    messages.push(userMessage);

    const recentMessages = messages
      .filter((m) => ['user', 'assistant'].includes(m.role))
      .slice(-10)
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    return recentMessages;
  }

  async messageToAIModel(
    user: User,
    messageDto: MessageDto,
  ): Promise<ChatbotResponseDto> {
    try {
      const messages = await this.buildFormattedMessages(
        user,
        messageDto.content,
        messageDto.initiate,
      );

      const systemPrompt = this.buildSystemPrompt();

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
      });

      const aiReply =
        response.choices[0]?.message?.content ?? 'Không có phản hồi.';

      await this.messageService.create({
        role: 'assistant',
        content: aiReply,
        user,
      });

      return { content: aiReply };
    } catch (error) {
      console.error('OpenAI Chatbot Error:', error);
      throw new InternalServerErrorException('Lỗi khi xử lý yêu cầu từ AI.');
    }
  }
}
