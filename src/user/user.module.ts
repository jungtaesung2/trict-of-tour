import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reservation, Tour])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
