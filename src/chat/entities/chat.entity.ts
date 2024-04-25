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
} from 'typeorm';
import { Guide } from 'src/guide/entities/guide.entity';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 18 })
  name: string;

  @Column({ length: 36 })
  room: string;

  //guide필요

  @OneToMany(() => ChatTalk, (chattalk) => chattalk.chat)
  chattalk: ChatTalk[];

  @ManyToOne(() => User, (user) => user.chats)
  user: User;

  @ManyToMany(() => User)
  @JoinTable()
  participants: (User | Guide)[];
}
