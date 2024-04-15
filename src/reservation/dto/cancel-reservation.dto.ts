import { PickType } from '@nestjs/mapped-types';
import { Reservation } from '../entities/reservation.entity';

export class CancelReservationDto extends PickType(Reservation, [
  'cancelReason',
]) {}
