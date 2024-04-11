import { Module } from '@nestjs/common';
import { ReservationSchedulerService } from './scheduler.service';
import { ReservationService } from 'src/reservation/reservation.service';

@Module({
  providers: [ReservationSchedulerService, ReservationService],
})
export class SchedulerModule {}
