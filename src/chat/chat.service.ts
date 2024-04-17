import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async getChatHistory(userId: number): Promise<Chat[]> {
    const chatHistory = await this.chatRepository.find({
      where: {
        senderId: userId,
      },
    });

    if (!chatHistory) {
      throw new NotFoundException('사용자의 채팅 기록을 찾을 수 없습니다.');
    }

    return chatHistory;
  }
}
