import { Module } from '@nestjs/common';
import { Mileage } from './entities/mileages.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MileagesController } from './mileages.controller';
import { MileagesService } from './mileages.service';

@Module({
    imports: [TypeOrmModule.forFeature([Mileage, Reservation])], //user
    controllers: [MileagesController],
    providers: [MileagesService],
})
export class MileagesModule {}
