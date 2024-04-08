import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from './user.entity';
@Entity()
export class Mileage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  mileageAmount: number; // 마일리지 금액
  // @ManyToOne(type => User, user => user.mileages)
  // user: User; // 사용자와의 관계 설정
}





