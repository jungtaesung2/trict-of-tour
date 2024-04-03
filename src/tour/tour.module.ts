import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Region } from './entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tour, Region])],
  controllers: [TourController],
  providers: [TourService],
})
export class TourModule {}
