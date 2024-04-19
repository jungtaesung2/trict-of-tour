import { IsEmail } from 'class-validator';
import { MileageHistory } from 'src/mileages/entities/mileageHistory.entity';
import { Mileage} from 'src/mileages/entities/mileages.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

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

    @Column({ type: 'varchar', length: 255 })
    tourType: string;

    @Column({ type: 'datetime' })
    createdAt: Date;

    @Column({ type: 'datetime' })
    
  @OneToMany(() => Mileage, mileage => mileage.user)
  @JoinColumn({ name: 'MileageId', referencedColumnName: 'id' })
  mileages: Mileage;

  @OneToMany(() => MileageHistory, mileageHistory => mileageHistory.user)
  @JoinColumn({ name: 'MileageHistoryId', referencedColumnName: 'id' })
  MileageHistory: MileageHistory; 
}