import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255 })
  nickname: string;

  @Column({ type: 'datetime' })
  birthDate: Date;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.userInfo)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Reservation, (reservation) => reservation.userInfo)
  reservations: Reservation[];
}
