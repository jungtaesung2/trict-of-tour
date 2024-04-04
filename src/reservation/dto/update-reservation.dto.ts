import { PickType } from '@nestjs/mapped-types';
import { Reservation } from '../entities/reservation.entity';
import { Column } from 'typeorm';

export class UpdateReservationDto extends PickType(Reservation, [
  'cancelReason',
]) {
  @Column({ type: 'varchar', nullable: true }) // 취소 이유는 선택적으로 저장될 수 있음
  cancelReason: string;
}
