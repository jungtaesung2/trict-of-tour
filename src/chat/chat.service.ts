import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatTalk } from './entities/chattalk.entity';
import { User } from '../user/entities/user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { Guide } from 'src/guide/entities/guide.entity';
import { WsException } from '@nestjs/websockets/errors';

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
    const chat = await this.chatRepository.findOne({
      where: { id: chatId, user: { id: userId } },
      relations: ['chatTalks'],
    });
    if (!chat) {
      throw new NotFoundException('사용자의 채팅 기록을 찾을 수 없습니다.');
    }
    return chat;
  }

  async createChatForTour(tour: Tour, userId: number): Promise<Chat> {
    try {
      const existingChat = await this.chatRepository.findOne({
        where: { tour, user: { id: userId } },
      });
      if (existingChat) {
        return existingChat;
      }
      const chat = this.chatRepository.create({
        tour: tour,
        guide: tour.guide,
        user: { id: userId },
      });
      return await this.chatRepository.save(chat);
    } catch (error) {
      throw new NotFoundException('채팅을 생성할 수 없습니다.');
    }
  }

  async saveChatRoom(room: string, chatId: number) {
    try {
      const chat = await this.chatRepository.findOne({ where: { id: chatId } });
      if (!chat) {
        throw new NotFoundException('채팅을 찾을 수 없습니다.');
      }
      chat.room = room;
      await this.chatRepository.save(chat); // 수정된 채팅 정보 저장
    } catch (error) {
      console.error('Error saving chat room:', error);
      throw new NotFoundException('채팅 방을 저장할 수 없습니다.');
    }
  }

  async getChatbyRoom(room: string) {
    const chat = await this.chatRepository.findOne({
      where: { room },
      relations: ['user', 'guide'],
    });
    if (!chat) {
      throw new NotFoundException('채팅을 찾을 수 없습니다.');
    }
    return chat;
  }

  async saveChatMessage(data: {
    message: string;
    room: string;
    userId: number;
    guideId: number;
  }) {
    try {
      const chat = await this.chatRepository.findOne({
        where: { room: data.room },
      });
      if (!chat) {
        throw new NotFoundException('해당 ID의 채팅방을 찾을 수 없습니다.');
      }

      const chattalkData: any = {
        content: data.message,
        room: chat.room,
        user: { id: data.userId },
        chat,
      };

      // 가이드 정보가 있는 경우에만 추가
      if (data.guideId) {
        chattalkData.guide = { id: data.guideId };
      }

      const chattalk = this.chatTalkRepository.create(chattalkData);

      await this.chatTalkRepository.save(chattalk);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  }
}
