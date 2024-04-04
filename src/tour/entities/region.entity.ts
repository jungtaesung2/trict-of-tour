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

  @Column({ type: 'varchar', nullable: false })
  regionName: string;

  @JoinColumn({ name: 'tourId' })
  @ManyToOne(() => Tour, (tour) => tour.regions, { onDelete: 'CASCADE' })
  tour: Tour;
}
