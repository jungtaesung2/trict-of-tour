import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tour } from './tour.entity';

@Entity({ name: 'regions' })
export class Region {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  regionName: string;

  // @Column()
  @ManyToOne(() => Tour, (tour) => tour.regions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'regionId' })
  tour: Tour;
}
