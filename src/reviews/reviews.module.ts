import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Tour, Reservation, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
