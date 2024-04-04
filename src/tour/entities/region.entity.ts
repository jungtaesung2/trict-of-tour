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

<<<<<<< HEAD
  @JoinColumn({ name: 'tourId' })
  @ManyToOne(() => Tour, (tour) => tour.regions, { onDelete: 'CASCADE' })
  tour: Tour;
=======

//   @JoinColumn({ name: 'regionId' })
//   @Column()
//   @ManyToOne(() => Tour, (tour) => tour.regions, { onDelete: 'CASCADE' })
//   tour: Tour;
  // @Column()
//   @ManyToOne(() => Tour, (tour) => tour.regions, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'regionId' })
//   tour: Tour;

>>>>>>> ffeacd5c85812c125e10130ac4c92734d310fe4f
}
