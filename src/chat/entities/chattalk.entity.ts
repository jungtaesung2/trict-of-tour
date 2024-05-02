import { User } from 'src/user/entities/user.entity';
import { Chat } from './chat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Guide } from 'src/guide/entities/guide.entity';

@Entity()
export class ChatTalk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  room: string; // 소켓 연결된 방 정보를 나타내는 컬럼

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Chat, (chat) => chat.chatTalks)
  chat: Chat;

  @ManyToOne(() => User, (user) => user.chatTalks)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Guide, (guide) => guide.chatTalks)
  @JoinColumn({ name: 'guideId', referencedColumnName: 'id' })
  guide: Guide;
}
