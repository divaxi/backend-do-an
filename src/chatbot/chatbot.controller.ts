import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ChatbotService } from './chatbot.service';
import { MessageDto } from './dto/message.dto';
import { User } from '../users/domain/user';
import { ChatbotResponseDto } from './dto/chatbot-response.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Chatbot')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'bot',
  version: '1',
})
export class ChatbotController {
  constructor(private readonly ChatbotService: ChatbotService) {}

  @Post('chat')
  @ApiOkResponse({
    type: ChatbotResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public ask(
    @Request() request,
    @Body() message: MessageDto,
  ): Promise<ChatbotResponseDto> {
    const user: User = request.user;
    return this.ChatbotService.messageToAIModel(user, message);
  }
}
