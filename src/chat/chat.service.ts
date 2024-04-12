import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const newChat = this.chatRepository.create({
      title: createChatDto.title,
    });
    await this.chatRepository.save(newChat);
    return newChat;
  }

  async findAllchat(userId: number): Promise<Chat[]> {
    return this.chatRepository.find({ where: { id: userId } });
  }

  async findOneById(chatId: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });

    if (!chat) {
      throw new NotFoundException('해당 ID의 채팅을 찾을 수 없습니다.');
    }
    return chat;
  }

  // async update(chatId: number, updateChatDto: UpdateChatDto) {
  //   const chat = await this.findOneById(chatId);
  //   if (!chat) {
  //     throw new NotFoundException(`Chat with id ${chatId} not found`);
  //   }
  //   const editchat = await this.chatRepository.update(chatId, updateChatDto);

  //   return editchat;
  // }

  // 메시지를 읽었을 경우에 알림이 가는거는 어떻게 하면 좋을까?
  // async markAsRead(chatId: number): Promise<Chat> {
  //   const chat = await this.findOneById(chatId);
  //   chat.read = true;
  //   chat.readAt = new Date();
  //   await this.chatRepository.save(chat);
  //   return chat;
  // }

  // 화면에서 클릭하면 경고 메시지뜨고 바로 삭제~!
  async remove(chatId: number) {
    return await this.chatRepository.delete(chatId);
  }
}
