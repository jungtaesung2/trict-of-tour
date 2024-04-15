import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
// import { User } from './user.entity';
@Entity()
export class Mileage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  mileageAmount: number; // 마일리지 금액
  
  @Column({ type: 'int', default: 0 })
  mileageBalance: number; // 마일리지 잔액, 기본값은 0

  // @ManyToOne(type => User, user => user.mileages)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: user;
}
@Entity()
export class MileageHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  usedMileage: number; // 사용한 마일리지

  @Column({ type: 'date' })
  usedDate: Date; // 사용한 날짜

  // @ManyToOne(type => User, user => user.MileageHistory)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: user;
  // @ManyToOne(() => Reservation, (reservations) => reservations.MileageHistory)
  // @JoinColumn({ name: 'reservationId', referencedColumnName: 'id' })
  // reservations: Reservation;

}




