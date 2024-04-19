// import { User } from 'src/user/entities/user.entity';
// import {
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Region } from './region.entity';

// @Entity({ name: 'userRegions' })
// export class UserRegion {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @JoinColumn({ name: 'userId' })
//   @ManyToOne(() => User, (user) => user.userRegions)
//   user: User;

//   @JoinColumn({ name: 'regionId' })
//   @ManyToOne(() => Region, (region) => region.userRegions)
//   region: Region;
// }

// 투어타입 + 여행지 합쳐서 추천
// 투어타입(유저에 있음) , 여행지 > 1개면 > 유저에서 해결 가능
// 여행지 2개라고 가정하면 >> 엔티티 하나 만드는게 맞다 ...

// 지역, 유저 가지고 오는게 맞다.
//
