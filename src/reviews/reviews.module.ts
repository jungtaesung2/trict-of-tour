import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { User } from 'src/user/entities/user.entity';
import { MileagesService } from 'src/mileages/mileages.service';
import { Mileage } from 'src/mileages/entities/mileages.entity';
import { MileageHistory } from 'src/mileages/entities/mileageHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Tour, Reservation, User, Mileage, MileageHistory])],
  controllers: [ReviewsController],
  providers: [ReviewsService, MileagesService],
})
export class ReviewsModule {}
