import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'bigint' })
    userId: number;

    @Column({ type: 'varchar', length: 255 })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 255 })
    nickname: string;

    @Column({ type: 'datetime' })
    birthDate: Date;

    @Column({ type: 'datetime' })
    createdAt: Date;

    @Column({ type: 'datetime' })
    updatedAt: Date;
}