import { User } from 'src/user/entities/user.entity';
import { ChatTalk } from './chattalk.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 18 })
  name: string;

  @Column({ length: 36, unique: true })
  room: string;

  @OneToMany(() => ChatTalk, (chattalk) => chattalk.chat)
  chattalk: ChatTalk[];

  @ManyToOne(() => User, (user) => user.chats)
  user: User;
}
