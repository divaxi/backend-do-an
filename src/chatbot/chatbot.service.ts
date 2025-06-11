import {
  HttpStatus,
  Injectable,
  OnModuleInit,
  UnprocessableEntityException,
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
import { ChatMessage } from 'gpt-tokenizer/esm/GptEncoding';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { encoding_for_model, TiktokenModel } from 'tiktoken';

@Injectable()
export class ChatbotService implements OnModuleInit {
  private readonly openai: OpenAI;
  private readonly model: string;
  private readonly baseSystemPrompt: string;
  private readonly maxTokens: number;
  private readonly reserveTokens: number;
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
    this.maxTokens = this.configService.getOrThrow<number>('openAI.maxTokens', {
      infer: true,
    });
    this.reserveTokens = this.configService.getOrThrow<number>(
      'openAI.reserveTokens',
      { infer: true },
    );
  }

  async onModuleInit() {
    await this.updateServiceSummary();
  }

  private countTokens(messages: ChatCompletionMessageParam[]): number {
    const encoding = encoding_for_model(this.model as TiktokenModel);
    let numTokens = 0;

    for (const message of messages) {
      numTokens += 4; // vai trò và metadata
      if (message.content) {
        numTokens += encoding.encode(message.content.toString()).length;
      }
      if (message.role) {
        numTokens += encoding.encode(message.role).length;
      }
    }

    return numTokens + 2; // cho assistant reply
  }

  private async updateServiceSummary() {
    const services = await this.serviceService.findAllWithPagination({
      paginationOptions: { page: 1, limit: 999 },
    });
    this.serviceSummary = services
      .map((s) => `Tên dịch vụ:${s.serviceName}, chỉ tiết: ${s.description}`)
      .join('\n');
  }

  private buildSystemPrompt(): string {
    return `${this.baseSystemPrompt}\n\nThông tin dịch vụ hiện tại:\n${this.serviceSummary}`;
  }

  private mapToChatParams(messages: Message[]): ChatCompletionMessageParam[] {
    return messages.map((msg) => ({
      role: msg.role as 'system' | 'user' | 'assistant',
      content: msg.content || '',
    }));
  }

  private createFallbackSummary(chat: ChatMessage[]): string {
    const userMessages = chat.filter((msg) => msg.role === 'user');
    const topics = userMessages
      .slice(-3)
      .map((msg) => msg.content.substring(0, 50) + '...');
    return `Cuộc hội thoại về: ${topics.join(', ')}`;
  }

  async summaryChat(chat: ChatMessage[]): Promise<string> {
    try {
      const messages: ChatCompletionMessageParam[] = chat.map((msg) => ({
        role: msg.role as 'system' | 'assistant' | 'user',
        content: msg.content || '',
      }));

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content:
              `Tóm tắt cuộc hội thoại sau đây một cách ngắn gọn và chính xác.\n` +
              `Giữ lại những thông tin quan trọng, quyết định chính, và context cần thiết.\n` +
              `Tóm tắt bằng tiếng Việt, độ dài không quá 200 từ.`,
          },
          ...messages,
        ],
        max_tokens: this.maxTokens - this.reserveTokens,
        temperature: 0.3,
      });

      return (
        response.choices[0]?.message?.content ||
        'Không thể tóm tắt cuộc hội thoại'
      );
    } catch (error) {
      console.error('Lỗi khi tóm tắt hội thoại:', error);
      return this.createFallbackSummary(chat);
    }
  }

  private async buildFormattedMessages(
    user: User,
    userInput: { role: string; content: string }[],
    initiate: boolean,
  ): Promise<ChatCompletionMessageParam[]> {
    let messages: Message[] = [];

    if (initiate) {
      messages = await this.messageService.findByUser(user.id);
    }

    const latestInput = userInput[userInput.length - 1];

    const userMessage = await this.messageService.create({
      role: 'user',
      content: latestInput.content.toString(),
      user,
    });

    messages.push(userMessage);

    let formattedMessages = this.mapToChatParams(messages);

    if (this.countTokens(formattedMessages) > this.maxTokens) {
      const midIndex = Math.floor(formattedMessages.length / 2);

      if (midIndex > 1) {
        const summaryText = await this.summaryChat(
          formattedMessages.slice(0, midIndex) as ChatMessage[],
        );

        const latterMessages = formattedMessages
          .slice(midIndex)
          .filter((msg) => msg.role !== 'system');

        formattedMessages = [
          { role: 'system', content: summaryText },
          ...latterMessages,
        ];
      }
    }

    return formattedMessages;
  }

  async messageToAIModel(
    user: User,
    messageDto: MessageDto,
  ): Promise<ChatbotResponseDto> {
    try {
      const userMessages = await this.buildFormattedMessages(
        user,
        messageDto.content,
        messageDto.initiate,
      );
      const systemPrompt = this.buildSystemPrompt();

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{ role: 'system', content: systemPrompt }, ...userMessages],
        max_tokens: this.maxTokens - this.reserveTokens,
      });

      const aiReply =
        response.choices[0]?.message?.content ?? 'Không có phản hồi.';

      await this.messageService.create({
        role: 'assistant',
        content: aiReply,
        user,
      });

      return { content: aiReply };
    } catch (err) {
      console.error('ChatbotService Error:', err);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
  }
}
