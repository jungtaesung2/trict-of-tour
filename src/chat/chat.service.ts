import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatTalk } from './entities/chattalk.entity';
import { User } from '../user/entities/user.entity';

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

  async getChatHistory(userId: number, chatId: number): Promise<Chat[]> {
    const user = await this.userRepostiory.findOne({
      where: { id: userId },
      relations: ['chats', 'chatTalks'],
    });
    if (!user) {
      throw new NotFoundException(
        '해당 ID의 유저의 채팅 정보를 찾을 수 없습니다.',
      );
    }

    const chatHistory = await this.chatRepository.findOne({
      where: { id: chatId },
    });

    if (!chatHistory) {
      throw new NotFoundException('사용자의 채팅 기록을 찾을 수 없습니다.');
    }

    return [chatHistory];
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
      });

      this.chatTalkRepository.save(chattalk);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  }
}
