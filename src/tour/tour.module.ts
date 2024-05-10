import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Region } from './entities/region.entity';
import { User } from 'src/user/entities/user.entity';
import { TourLike } from './entities/like.entity';
import { Guide } from 'src/guide/entities/guide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tour, Region, User, TourLike, Guide])],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
