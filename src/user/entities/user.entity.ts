// import { UserRegion } from 'src/tour/entities/userRegion.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { TourLike } from 'src/tour/entities/like.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { TourType } from 'src/tour/types/tourtypes.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty({ message: '투어타입을 입력해주세요' })
  @Column({ type: 'enum', enum: TourType })
  tourType: TourType;

  //   @OneToMany(() => UserRegion, (userRegion) => userRegion.user)
  //   userRegions: UserRegion[];

  @OneToMany(() => Tour, (tour) => tour.user)
  tours: Tour[];

  @OneToMany(() => TourLike, (tourLike) => tourLike.user)
  tourLikes: TourLike[];
}
