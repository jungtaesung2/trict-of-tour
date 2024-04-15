import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tour } from './tour.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { RegionName } from '../types/regiontypes.enum';

@Entity({ name: 'regions' })
export class Region {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsString()
  @IsNotEmpty({ message: '투어타입을 입력해주세요' })
  @Column({ type: 'enum', enum: RegionName })
  regionName: RegionName;

  @OneToMany(() => Tour, (tour) => tour.region, { cascade: true })
  tours: Tour[];
}
