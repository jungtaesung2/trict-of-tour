import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
// import { User } from './user.entity';
import { Status } from '../types/status.type';

@Entity({ name: 'apple' })
export class Apple {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column({ type: 'int', nullable: true })
  userId: number;

  @IsNumber()
  @Column({ type: 'int', nullable: false })
  tourId: number;

  @IsString()
  @Column({ type: 'varchar', nullable: false })
  paymentAmount: string;

  @IsString()
  @Column({ type: 'varchar', length: 100, nullable: false })
  @IsNotEmpty({ message: '답변을 입력해주세요' })
  specialRequests: string;

  @IsDate()
  @Column({ type: 'date', nullable: false })
  date: Date;

  @IsNumber()
  @Column({ type: 'int', nullable: false })
  people: number;

  @IsString()
  @Column({ type: 'varchar', length: 30, nullable: false })
  @IsNotEmpty({ message: '이름을 영어로 입력해주세요' })
  firstname: string;

  @IsString()
  @Column({ type: 'varchar', length: 30, nullable: false })
  @IsNotEmpty({ message: '성을 영어로 입력해주세요' })
  lastname: string;

  @IsString() // 취소 이유를 저장할 데이터베이스 필드
  @Column({ type: 'varchar', nullable: true }) // 취소 이유는 선택적으로 저장될 수 있음
  cancelReason: string;

  @IsEnum(Status)
  @Column({ type: 'enum', enum: Status, default: Status.ONGOING })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt: Date; // 추가된 cancelledAt 속성

  @DeleteDateColumn()
  deletedAt: Date;
}