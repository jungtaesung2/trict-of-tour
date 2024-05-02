import { Module } from '@nestjs/common';
import { Mileage } from './entities/mileages.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MileagesController } from './mileages.controller';
import { MileagesService } from './mileages.service';
import { ReservationService } from 'src/reservation/reservation.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { TourService } from 'src/tour/tour.service';
import { Region } from 'src/tour/entities/region.entity';
import { UserInfo } from '../user/entities/userinfo.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';
import { ChatService } from 'src/chat/chat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mileage,
      Reservation,
      User,
      Tour,
      Region,
      UserInfo,
      Chat,
      ChatTalk,
    ]),
  ],
  controllers: [MileagesController],
  providers: [MileagesService, ReservationService, TourService, ChatService],
  exports: [TypeOrmModule, MileagesService],

})
export class MileagesModule {}
