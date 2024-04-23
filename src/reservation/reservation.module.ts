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
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Tour, Region, User]) /*UserModule*/,
    JwtModule.register({}),
    AuthModule,
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    TourService,
    ReservationSchedulerService,
    ReservationGateWay,
  ],
  exports: [TypeOrmModule, ReservationService, ReservationGateWay],
})
export class ReservationModule {}
