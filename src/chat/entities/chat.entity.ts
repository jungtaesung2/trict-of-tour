import { User } from 'src/user/entities/user.entity';
import { ChatTalk } from './chattalk.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Guide } from 'src/guide/entities/guide.entity';
import { Tour } from 'src/tour/entities/tour.entity';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 36 })
  room: string;

  @OneToMany(() => ChatTalk, (chattalk) => chattalk.chat)
  chattalk: ChatTalk[];

  @ManyToOne(() => User, (user) => user.chats)
  user: User;

  @ManyToOne(() => Guide, (guide) => guide.chats)
  guide: Guide;

  @ManyToOne(() => Tour, (tour) => tour.chats)
  tour: Tour;

  @CreateDateColumn()
  createdAt: Date;
}
