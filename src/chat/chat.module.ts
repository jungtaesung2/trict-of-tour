import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from '../gateway/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatTalk } from './entities/chattalk.entity';
import { User } from '../user/entities/user.entity';
import { UserInfo } from 'src/user/entities/userinfo.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Chat,
      ChatTalk,
      User,
      UserInfo,
      Reservation,
      Tour,
    ]),
  ],
  providers: [ChatService],
  exports: [TypeOrmModule, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
