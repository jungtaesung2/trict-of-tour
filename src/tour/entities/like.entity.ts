import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Tour } from './tour.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'tourlikes' })
@Unique(['tour', 'user'])
export class TourLike {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'tourId' })
  @ManyToOne(() => Tour, (tour) => tour.tourLikes, { onDelete: 'CASCADE' })
  tour: Tour;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.tourLikes, { onDelete: 'CASCADE' })
  user: User;
}
