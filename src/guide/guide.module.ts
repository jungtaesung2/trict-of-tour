import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { User } from 'src/user/entities/user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';
import { Tour } from 'src/tour/entities/tour.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guide, User, Reservation, Chat, ChatTalk, Tour]),
  ],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuideModule {}
