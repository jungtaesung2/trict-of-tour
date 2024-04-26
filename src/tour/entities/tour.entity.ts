import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TourType } from '../types/tourtypes.enum';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Region } from './region.entity';
import { User } from 'src/user/entities/user.entity';
import { TourLike } from './like.entity';
import { Guide } from 'src/guide/entities/guide.entity';

@Entity({ name: 'tours' })
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  // @IsNumber()
  // @IsNotEmpty({ message: '지역 ID를 입력해주세요.' })
  // @Column({ type: 'int', unsigned: true, name: 'regionId', nullable: false })
  // regionId: number;

  //   @IsNumber()
  //   @IsNotEmpty({ message: '가이드 ID를 입력해주세요.' })
  //   @Column({ type: 'int', unsigned: true, name: 'guideId', nullable: false })
  //   guideId: number;

  @IsString()
  @IsNotEmpty({ message: '투어 이름을 입력해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @IsNotEmpty({ message: '시작일을 입력해주세요' })
  @Column({ type: 'datetime', nullable: false })
  startDate: Date;

  @IsNotEmpty({ message: '만기일을 입력해주세요' })
  @Column({ type: 'datetime', nullable: false })
  endDate: Date;

  @IsString()
  @IsNotEmpty({ message: '가격을 입력해주세요' })
  @Column({ type: 'varchar', nullable: false })
  price: string;

  @IsString()
  @IsNotEmpty({ message: '투어타입을 입력해주세요' })
  @Column({ type: 'enum', enum: TourType })
  tourType: TourType;

  @IsString()
  @IsNotEmpty({ message: '인원을 입력해주세요' })
  @Column({ type: 'varchar', nullable: false })
  @Min(1, { message: '한 명 이상이어야 합니다.' })
  @Max(10, { message: '최대 10명까지 가능합니다.' })
  people: string;

  @IsString()
  @IsNotEmpty({ message: '이미지을 넣어주세요' })
  @Column({ type: 'varchar', nullable: false })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요' })
  @Column({ type: 'text', nullable: false })
  content: string;

  @IsNumber()
  @IsNotEmpty({ message: '위도를 입력해주세요' })
  @Column({ type: 'text', nullable: false })
  latitude: number;

  @IsNumber()
  @IsNotEmpty({ message: '경도를 입력해주세요' })
  @Column({ type: 'text', nullable: false })
  longitude: number;

  @IsNumber()
  @IsNotEmpty({ message: '좋아요 수를 입력해주세요' })
  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservations) => reservations.tour)
  reservations: Reservation[];

  @OneToMany(() => Review, (reviews) => reviews.tour)
  reviews: Review[];

  @JoinColumn({ name: 'regionId' })
  @ManyToOne(() => Region, (region) => region.tours, { onDelete: 'CASCADE' })
  region: Region;

  //   @JoinColumn({ name: 'guideId' })
  //   @ManyToOne(() => Guide, (guide) => guide.tour, { onDelete: 'CASCADE' })
  //   guide: Guide;

  // @OneToOne(() => Like, (like) => like.tour)
  // like: Like;

  @OneToMany(() => TourLike, (tourLikes) => tourLikes.tour)
  tourLikes: TourLike[];

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.tours, { onDelete: 'CASCADE' })
  user: User;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  fileKey: string;
}
