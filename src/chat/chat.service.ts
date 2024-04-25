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
    @InjectRepository(Reservation)
    private reservationRepostiory: Repository<Reservation>,
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
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

  async createChatforReservation(reservationId: number) {
    try {
      const reservation = await this.reservationRepostiory.findOne({
        where: { id: reservationId },
        relations: ['guest', 'tour'],
      });
      if (!reservation) {
        throw new NotFoundException('예약을 찾을 수 없습니다.');
      }

      const chat = new Chat();
      chat.room = `reservation_${reservation.id}`;
      chat.participants = [reservation.user];
      // reservation.tour.guide

      await this.chatRepository.save(chat);
      return {
        chatId: chat.id,
        // guideId: reservation.tour.guide.id,
        userId: reservation.user.id,
      };
    } catch (error) {
      console.error('채팅방 만들기 실패', error);
    }
  }

  async saveJoinedRoom(room: string) {
    try {
      const chatRoom = new Chat();
      chatRoom.room = room;

      await this.chatRepository.save(chatRoom);
    } catch (error) {
      console.error('Error saving joined room:', error);
    }
  }

  async saveChatMessage(data: {
    message: string;
    room: string;
    userId: number;
  }) {
    try {
      // const user = req.user;

      // 입장한 소켓 룸이 일치하는지
      const chatting = await this.chatRepository.findOne({
        where: { room: data.room },
      });
      if (!chatting) {
        throw new NotFoundException('해당 ID의 채팅방을 찾을 수 없습니다.');
      }

      // const chatMessage = new ChatTalk();

      // chatMessage.content = data.message;
      // chatMessage.room = data.room;
      // chatMessage.user = { id: data.userId };
      //이자리에 user 엔티티 들어와야함

      //편리해서? 위에 거 하기귀찮으니까
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
