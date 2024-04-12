import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from '../chat/dto/update-chat.dto';

@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  //@AuthGuard 가져올 예정 ! > userId 를 전달할 필요 없음
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: number) {
    return this.chatService.findAllchat(userId);
  }

  @Get(':chatId')
  findOne(@Param('chatId') chatId: number) {
    return this.chatService.findOneById(chatId);
  }

  // @Get(':chatId/read')
  // markAsRead(@Param('chatId') chatId: number) {
  //   return this.chatService.markAsRead(chatId);
  // }

  @Patch(':chatId')
  update(
    @Param('chatId') chatId: number,
    @Body() updateChatDto: UpdateChatDto,
  ) {
    return this.chatService.update(chatId, updateChatDto);
  }

  @Delete(':chatId/leave')
  remove(@Param('chatId') chatId: number) {
    return this.chatService.remove(chatId);
  }
}
