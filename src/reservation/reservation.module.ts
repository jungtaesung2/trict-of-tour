import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { TourService } from 'src/tour/tour.service';
import { Tour } from '../tour/entities/tour.entity';
import { Region } from 'src/tour/entities/region.entity';
import { ReservationSchedulerService } from 'src/scheduler/scheduler.service';
import { User } from 'src/user/entities/user.entity';
import { ReservationGateWay } from '../gateway/reservation.gateway';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';
import { MileagesService } from 'src/mileages/mileages.service';
import { MileageHistory } from 'src/mileages/entities/mileageHistory.entity';
import { Mileage } from 'src/mileages/entities/mileages.entity';
import { ChatService } from 'src/chat/chat.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Tour, Region, User, Chat, ChatTalk, Mileage, MileageHistory]),
    JwtModule.register({}),
    AuthModule,
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    TourService,
    ReservationSchedulerService,
    ReservationGateWay,
    MileagesService,
    ChatService,
  ],
  exports: [TypeOrmModule, ReservationService, ReservationGateWay, ChatService],
})
export class ReservationModule {}
