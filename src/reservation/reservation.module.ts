import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { TourService } from 'src/tour/tour.service';
import { Tour } from '../tour/entities/tour.entity';
import { Region } from 'src/tour/entities/region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Tour, Region]) /*UserModule*/,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, TourService],
  exports: [TypeOrmModule],
})
export class ReservationModule {}
