import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MileageHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type : 'int', default : 0 })
  changeAmount: number; // 사용, 충전

  @Column({ type : 'int', default : 0 })
  balance: number; // 잔액

  @Column({ type: 'varchar' })
  reason : string; // 사용한 내역

  @CreateDateColumn()
  createdAt: Date;
  
  @Column({ type: 'date' })
  usedDate: Date; // 사용한 날짜

  @ManyToOne(() => User, user => user.MileageHistory)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}