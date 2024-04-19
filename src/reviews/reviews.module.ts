import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Tour, Reservation])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
