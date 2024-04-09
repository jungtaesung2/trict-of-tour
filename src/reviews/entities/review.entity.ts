import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'bigint' })
  reservationId: number;

  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @Column({ type: 'varchar', length: 255 })
  star: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Reservation, (reservations) => reservations.reviews)
  @JoinColumn({ name: 'reservationId', referencedColumnName: 'id' })
  reservations: Reservation;
  tour: any;
}
