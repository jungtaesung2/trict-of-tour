import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Region } from './entities/region.entity';
import { User } from 'src/user/entities/user.entity';
import { TourLike } from './entities/like.entity';
import { Guide } from 'src/guide/entities/guide.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatService } from 'src/chat/chat.service';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tour,
      Region,
      User,
      TourLike,
      Guide,
      Chat,
      ChatTalk,
    ]),
  ],
  controllers: [TourController],
  providers: [TourService, ChatService],
})
export class TourModule {}
