import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Mileage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  mileageAmount: number; // 마일리지 금액
  
  @Column({ type: 'int', default: 0 })
  mileageBalance: number; // 마일리지 잔액, 기본값은 0

  @ManyToOne(() => User, user => user.mileages)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Review, reviews => reviews.mileages)
  @JoinColumn({ name: 'reviewId', referencedColumnName: 'id' })
  reviews: Review;

  @ManyToOne(() => Reservation, (reservations) => reservations.Mileage)
  @JoinColumn({ name: 'reservationId', referencedColumnName: 'id' })
  reservations: Reservation;
}