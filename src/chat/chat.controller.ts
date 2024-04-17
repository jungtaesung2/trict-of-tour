import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';

@Controller('/chat-history')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':userId')
  async getChatHistory(@Param('userId') userId: number): Promise<Chat[]> {
    return await this.chatService.getChatHistory(userId);
  }
}
