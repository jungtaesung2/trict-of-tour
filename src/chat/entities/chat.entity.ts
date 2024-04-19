import { ChatTalk } from './chattalk.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
}
