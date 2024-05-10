// guide.entity.ts
<<<<<<< HEAD
import { IsNotEmpty, IsString } from 'class-validator';
=======
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';
>>>>>>> d8391713920d2fe3095bb052d1497ed655402393
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { TourType } from 'src/tour/types/tourtypes.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '투어타입을 입력해주세요' })
  @Column({ type: 'varchar' })
  tourType: TourType;

  @Column({ type: 'varchar', length: 255 })
  fileUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

<<<<<<< HEAD
=======
  @OneToMany(() => Chat, (chat) => chat.guide)
  chats: Chat;

  @OneToMany(() => ChatTalk, (chatTalk) => chatTalk.guide)
  chatTalks: ChatTalk[];

>>>>>>> d8391713920d2fe3095bb052d1497ed655402393
  @OneToMany(() => Tour, (tour) => tour.guide)
  tour: Tour[];
}
