import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { MessageDto } from './dto/message.dto';
import { ChatbotResponseDto } from './dto/chatbot-response.dto';
import OpenAI from 'openai';
import { MessagesService } from '../messages/messages.service';
import { User } from '../users/domain/user';
import { Message } from '../messages/domain/message';

@Injectable()
export class ChatbotService {
  private readonly openai: OpenAI;

  constructor(
    private configService: ConfigService<AllConfigType>,
    private messageService: MessagesService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('openAI.openAISecretKey', {
        infer: true,
      }),
    });
  }

  async messageToAIModel(
    user: User,
    message: MessageDto,
  ): Promise<ChatbotResponseDto> {
    let messages: Message[] = [];

    if (message.initiate) {
      const previousMessages = await this.messageService.findByUser(user.id);
      messages = [...previousMessages];
    }

    const currentUserMessage = await this.messageService.create({
      role: 'user',
      content: message.content,
      user: user,
    });
    messages.push(currentUserMessage);

    // Chuyển thành định dạng OpenAI yêu cầu
    const formattedMessages = messages.map((m) => ({
      role: m.role as any,
      content: m.content,
    }));

    // Gọi OpenAI
    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow<string>('openAI.openAIModel', {
        infer: true,
      }),
      messages: [
        {
          role: 'system',
          content:
            'Bạn là một trợ lý du lịch thông minh, chỉ trả lời bằng tiếng Việt.',
        },

        ...formattedMessages,
      ],
    });

    const aiReply = response.choices[0]?.message?.content ?? 'No response';

    await this.messageService.create({
      role: 'assistant',
      content: aiReply,
      user: user,
    });

    return {
      content: aiReply,
    };
  }
}
