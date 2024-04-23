import _ from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }
  async validate(payload: any) {
    console.log(payload);
    if (!payload) {
      throw new BadRequestException('쿠키값이 올바르지 않습니다.');
    }
    const user = await this.userService.getUser(payload.id);
    if (!user) {
      throw new BadRequestException('유저가 존재하지 않습니다.');
    }
    return user; // 페이로드에서 사용자 ID를 반환하거나, 필요한 인증 로직을 수행할 수 있습니다.
  }
}
