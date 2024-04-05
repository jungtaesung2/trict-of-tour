import { Tour } from 'src/tour/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'reviews' })
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint' })
    userId: number;

    @Column({ type: 'bigint' })
    reservationId: number;

    @Column({ type: 'varchar', length: 255 })
    comment: string;

    @Column({ type: 'varchar', length: 255 })
    star: string;

    @Column({ type: 'varchar', length: 255 })
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Tour, (tour) => tour.reviews)
    @JoinColumn({ name: 'tourId', referencedColumnName: 'id' })
    tour: Tour;

}

