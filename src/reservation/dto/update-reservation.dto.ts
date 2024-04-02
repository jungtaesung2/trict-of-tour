import { PickType } from '@nestjs/mapped-types';
import { Reservation } from '../entities/reservation.entity';

export class UpdateReservationDto extends PickType(Reservation, [
  `cancelReason`,
  `status`,
]) {}
