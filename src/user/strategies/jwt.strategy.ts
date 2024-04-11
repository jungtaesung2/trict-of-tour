import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserService } from '../user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService : UserService,
    private readonly configService : ConfigService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const token = req.cookies['authorization']; // 쿠키 이름에 따라 수정
          return token ? token.replace(/^Bearer\s/, '') : null;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')
    });
  }
  async validate(payload: JwtPayload) {
    if (!payload){
      throw new BadRequestException('쿠키값이 올바르지 않습니다.')
    }
    const user = await this.userService.getUser(payload.id);
    if (!user){
      throw new BadRequestException('유저가 존재하지 않습니다.')
    }
    return user; // 페이로드에서 사용자 ID를 반환하거나, 필요한 인증 로직을 수행할 수 있습니다.
  }
}