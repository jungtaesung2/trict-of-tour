import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from '../gateway/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatTalk } from './entities/chattalk.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatTalk, User])],
  providers: [ChatService],
  exports: [TypeOrmModule, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
