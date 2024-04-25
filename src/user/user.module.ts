import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Mileage } from 'src/mileages/entities/mileages.entity';
import { UserInfo } from './entities/userinfo.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatTalk } from 'src/chat/entities/chattalk.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserInfo,
      Reservation,
      Tour,
      Mileage,
      Chat,
      ChatTalk,
    ]), // 이건 TypeORM 강의 시간에 배웠죠?
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        // .env 파일에 JWT_SECRET_KEY라는 키로 비밀키를 저장해두고 사용합니다.
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
