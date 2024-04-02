import { Module } from '@nestjs/common';
import { reservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { TourModule } from 'src/tour/tour.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]) /*UserModule*/,
    ,
    TourModule,
  ],
  controllers: [ReservationController],
  providers: [reservationService],
  exports: [reservationService],
})
export class ReservationModule {}
