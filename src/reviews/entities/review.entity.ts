import { Tour } from 'src/tour/entities/tour.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity({ name: 'reviews' })
export class Review {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false  })
    comment: string;

    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false  })
    star: string;

    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false  })
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Tour, (tour) => tour.reviews)
    @JoinColumn({ name: 'tourId', referencedColumnName: 'id' })
    tour: Tour;

    @ManyToOne(() => Reservation, (reservations) => reservations.reviews)
    @JoinColumn({ name: 'reservationId', referencedColumnName: 'id' })
    reservations: Reservation;
}

