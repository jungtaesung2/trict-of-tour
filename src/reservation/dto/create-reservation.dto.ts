import { PickType } from '@nestjs/mapped-types';
import { Reservation } from '../entities/reservation.entity';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateReservationDto extends PickType(Reservation, [
  `date`,
  `paymentAmount`,
  `people`,
  `firstname`,
  `lastname`,
  `specialRequests`,
]) {
  @IsNotEmpty()
  paymentAmount: string;

  @IsNotEmpty()
  people: number;

  @IsNotEmpty({ message: '이름을 영어로 입력해주세요' })
  firstname: string;

  @IsNotEmpty({ message: '성을 영어로 입력해주세요' })
  lastname: string;

  @IsNotEmpty({ message: '답변을 입력해주세요' })
  specialRequests: string;
}
