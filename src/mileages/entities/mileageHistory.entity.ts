import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MileageHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type : 'int', default : 0 })
  usedMileage: number; // 사용한 마일리지

  @Column({ type: 'date' })
  usedDate: Date; // 사용한 날짜

  @ManyToOne(() => User, user => user.MileageHistory)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

}