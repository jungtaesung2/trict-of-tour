import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column() // 상담원 또는 시스템에서 보내는 사용자
  sender: string;

  @Column() // 고객 또는 상담원에게 받는 사용자
  recipient: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // @Column({ default: false }) // 기본값은 false로 설정
  // read: boolean;

  // @Column({ nullable: true }) // 읽은 시간은 null일 수도 있음
  // readAt: Date;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // cteateAt: Date;
}
