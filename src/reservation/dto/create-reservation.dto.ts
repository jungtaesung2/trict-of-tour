import { PickType } from '@nestjs/mapped-types';
import { Reservation } from '../entities/reservation.entity';

export class CreateReservationDto extends PickType(Reservation, [
  `date`,
  `people`,
  `firstname`,
  `lastname`,
  `specialRequests`,
  `paymentAmount`,
  ,
]) {}
