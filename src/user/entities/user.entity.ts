import { IsEmail } from 'class-validator';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  nickname: string;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255 })
  tourType: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  // User와 Chat의 일대다 관계
  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  // User와 ChatTalk의 일대다 관계
  @OneToMany(() => ChatTalk, (chatTalk) => chatTalk.user)
  chatTalks: ChatTalk[];
}
