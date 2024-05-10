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
import { GuideService } from 'src/guide/guide.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly guideService: GuideService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }
  // async validate(payload: any) {
  //   console.log(payload);
  //   if (!payload) {
  //     throw new BadRequestException('쿠키값이 올바르지 않습니다.');
  //   }
  //   const user = await this.userService.getUser(payload.id);
  //   if (!user) {
  //     throw new BadRequestException('유저가 존재하지 않습니다.');
  //   }
  //   return user; // 페이로드에서 사용자 ID를 반환하거나, 필요한 인증 로직을 수행할 수 있습니다.
  // }
  async validate(payload: any) {
    let user;
    // payload의 내용을 기반으로 유저와 가이드를 구별하여 처리합니다.
    if (payload.type === 'user') {
      user = this.userService.getUser(payload.id);
    } else if (payload.type === 'guide') {
      user = this.guideService.getGuide(payload.id);
    }
    return { ...user, type: payload.type };
  }
}
