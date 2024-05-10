import { MileageHistory } from 'src/mileages/entities/mileageHistory.entity';
import { Mileage } from 'src/mileages/entities/mileages.entity';
// import { UserRegion } from 'src/tour/entities/userRegion.entity';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { TourLike } from 'src/tour/entities/like.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { TourType } from 'src/tour/types/tourtypes.enum';
import { OneToMany, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Review } from 'src/reviews/entities/review.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { UserInfo } from './userinfo.entity';

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

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  @JoinColumn()
  userInfo: UserInfo;

  @OneToMany(() => Mileage, (mileage) => mileage.user)
  @JoinColumn({ name: 'MileageId', referencedColumnName: 'id' })
  mileages: Mileage;

  @OneToMany(() => MileageHistory, (mileageHistory) => mileageHistory.user)
  @JoinColumn({ name: 'MileageHistoryId', referencedColumnName: 'id' })
  MileageHistory: MileageHistory;

  // @IsString()
  // @IsNotEmpty({ message: '투어타입을 입력해주세요' })
  // @Column({ type: 'enum', enum: TourType })
  // tourType: TourType;

  @OneToMany(() => Review, (reviews) => reviews.user)
  @JoinColumn({ name: 'reviewId', referencedColumnName: 'id' })
  review: Review;

  @IsString()
  @IsNotEmpty({ message: '투어타입을 입력해주세요' })
  @Column({ type: 'varchar' })
  tourType: TourType;

  // @OneToMany(() => UserRegion, (userRegion) => userRegion.user)
  //   userRegions: UserRegion[];

  @OneToMany(() => Tour, (tour) => tour.user)
  tours: Tour[];

  @OneToMany(() => TourLike, (tourLike) => tourLike.user)
  tourLikes: TourLike[];

  // User와 Chat의 일대다 관계
  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  // User와 ChatTalk의 일대다 관계
  @OneToMany(() => ChatTalk, (chatTalk) => chatTalk.user)
  chatTalks: ChatTalk[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: User;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
