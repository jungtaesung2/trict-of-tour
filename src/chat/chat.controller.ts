import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userinfo.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('/chat-history')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get(':userId')
  async getChatHistory(
    @Param('chatId') chatId: number,
    @UserInfo() user: User,
  ): Promise<Chat[]> {
    const userId = user.id;
    return await this.chatService.getChatHistory(userId, chatId);
  }
}
