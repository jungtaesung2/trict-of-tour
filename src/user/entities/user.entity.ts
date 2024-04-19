// import { UserRegion } from 'src/tour/entities/userRegion.entity';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { TourLike } from 'src/tour/entities/like.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { TourType } from 'src/tour/types/tourtypes.enum';
import { OneToMany, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @Column({ type: 'varchar', length: 255, unique : true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255,  })
    nickname: string;

    @Column({ type: 'varchar', length: 255 })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty({ message: '투어타입을 입력해주세요' })
    @Column({ type: 'varchar' })
    tourType: TourType;

  //   @OneToMany(() => UserRegion, (userRegion) => userRegion.user)
  //   userRegions: UserRegion[];

    @OneToMany(() => Tour, (tour) => tour.user)
    tours: Tour[];

    @OneToMany(() => TourLike, (tourLike) => tourLike.user)
    tourLikes: TourLike[];
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt : Date | null;
}