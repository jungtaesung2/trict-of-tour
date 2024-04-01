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

  @JoinColumn({ name: 'regionId' })
  @Column()
  @ManyToOne(() => Tour, (tour) => tour.regions, { onDelete: 'CASCADE' })
  tour: Tour;
}
