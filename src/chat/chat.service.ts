import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ChatTalk } from './entities/chattalk.entity';
import { ChatGateway } from 'src/gateway/chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    // @InjectRepository(ChatTalk)
    // private chatTalkRepository: Repository<ChatTalk>,
    @InjectRepository(User)
    private userRepostiory: Repository<User>,
    private chatGateway: ChatGateway,
  ) {}

  async getChatHistory(userId: number, chatId: number): Promise<Chat[]> {
    const user = await this.userRepostiory.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('해당 ID의 유저를 찾을 수 없습니다.');
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

  async saveChatMessage(data: { message: string; room: string }) {
    try {
      const chatMessage = new ChatTalk();

      chatMessage.content = data.message;
      chatMessage.room = data.room;

      // // 채팅방 ID를 설정하는 부분
      // const chatting = await this.chatRepository.findOne({
      //   where: { roomId: data.room },
      // });
      // if (!chatting) {
      //   throw new NotFoundException('해당 ID의 채팅방을 찾을 수 없습니다.');
      // }

      await this.chatRepository.save(chatMessage);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  }
}
