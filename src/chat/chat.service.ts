import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatTalk } from './entities/chattalk.entity';
import { User } from '../user/entities/user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(ChatTalk)
    private chatTalkRepository: Repository<ChatTalk>,
    @InjectRepository(User)
    private userRepostiory: Repository<User>,
  ) {}

  async getChatHistory(userId: number, chatId: number) {
    const user = await this.userRepostiory.findOne({
      where: { id: userId },
      relations: ['chats'],
    });
    if (!user) {
      throw new NotFoundException(
        '해당 ID의 유저의 채팅 정보를 찾을 수 없습니다.',
      );
    }

    const chat = this.userRepostiory.findOne({
      where: { id: chatId },
      relations: ['chatTalks'],
    });

    if (!chat) {
      throw new NotFoundException('사용자의 채팅 기록을 찾을 수 없습니다.');
    }

    return chat;
  }

  async createChatForTour(tour: Tour): Promise<Chat> {
    try {
      const chat = new Chat();
      chat.tour = tour;
      return await this.chatRepository.save(chat);
    } catch (error) {
      throw new NotFoundException('채팅을 생성할 수 없습니다.');
    }
  }

  async getParticipantsByChatId(chatId: number) {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['user', 'guide'],
    });
    if (!chat) {
      throw new NotFoundException('채팅을 찾을 수 없습니다.');
    }

    return {
      userId: chat.user.id,
      guideId: chat.guide.id,
    };
  }

  async saveChatRoom(room: number) {
    try {
      const chat = new Chat();
      chat.id = room;
      await this.chatRepository.save(chat);
    } catch (error) {
      console.error('Error saving chat room:', error);
    }
  }

  async saveChatMessage(data: {
    message: string;
    room: string;
    userId: number;
  }) {
    try {
      const chatting = await this.chatRepository.findOne({
        where: { room: data.room },
      });
      if (!chatting) {
        throw new NotFoundException('해당 ID의 채팅방을 찾을 수 없습니다.');
      }

      const chattalk = await this.chatTalkRepository.create({
        content: data.message,
        room: data.room,
        user: { id: data.userId },
        chat: chatting,
      });

      this.chatTalkRepository.save(chattalk);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  }
}
