import { User } from 'src/user/entities/user.entity';
import { Chat } from './chat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChatTalk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  room: string; // 소켓 연결된 방 정보를 나타내는 컬럼

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Chat, (chat) => chat.chattalk)
  @JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.chatTalks)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
