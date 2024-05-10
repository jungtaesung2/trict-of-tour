import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Mileage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', default: 0  })
  mileageAmount: number; // 마일리지 금액

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.mileages)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

}