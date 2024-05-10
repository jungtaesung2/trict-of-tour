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
<<<<<<< HEAD
import { Guide } from 'src/guide/entities/guide.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mileage,
=======
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';
import { ChatService } from 'src/chat/chat.service';
import { MileageHistory } from './entities/mileageHistory.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      Mileage,
      MileageHistory,
>>>>>>> d8391713920d2fe3095bb052d1497ed655402393
      Reservation,
      User,
      Tour,
      Region,
      UserInfo,
<<<<<<< HEAD
    ]),
  ],
  controllers: [MileagesController],
  providers: [MileagesService],
  exports: [MileagesService],
=======
      Chat,
      ChatTalk,
    ]),
  ],
  controllers: [MileagesController],
  providers: [MileagesService, ReservationService, TourService, ChatService],
  exports: [TypeOrmModule, MileagesService],

>>>>>>> d8391713920d2fe3095bb052d1497ed655402393
})
export class MileagesModule {}
