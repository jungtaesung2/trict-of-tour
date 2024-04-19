import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('/chat-history')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':userId')
  async getChatHistory(
    @Param('userId') userId: number,
    @Param('chatId') chatId: number,
  ): Promise<Chat[]> {
    return await this.chatService.getChatHistory(userId, chatId);
  }
}
