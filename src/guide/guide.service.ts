import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { SignInGuideDto } from './dto/signin-guide.dto';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private readonly guideRepository: Repository<Guide>,
    private jwtservice: JwtService,
    private configservice: ConfigService,
  ) {}
  async signup({
    email,
    password,
    confirmpassword,
    name,
    tourType,
    fileUrl,
  }: CreateGuideDto) {
    const existedGuide = await this.guideRepository.findOneBy({ email });
    if (existedGuide) {
      throw new BadRequestException('이미 존재하는 가이드입니다.');
    }

    const matchpassword = password === confirmpassword;
    if (!matchpassword) {
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      );
    }
    // 비밀번호 해싱
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const guide = await this.guideRepository.save({
      name,
      password: hashedPassword,
      email,
      tourType,
      fileUrl,
    });

    return this.getToken(guide.id);
  }

  // signin 로그인
  async signin({ email, password }: SignInGuideDto) {
    const user = await this.guideRepository.findOne({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new BadRequestException('사용자가 존재하지 않습니다.');
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }
    return this.getToken(user.id);
  }

  async getToken(guideId: number) {
    const payload = { type: 'guide', id: guideId };
    const accessToken = this.jwtservice.sign(payload);
    return accessToken;
  }
  async getGuide(guideId: number) {
    const user = await this.guideRepository.findOne({ where: { id: guideId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  findAll() {
    return `This action returns all guide`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guide`;
  }

  update(id: number, updateGuideDto: UpdateGuideDto) {
    return `This action updates a #${id} guide`;
  }

  remove(id: number) {
    return `This action removes a #${id} guide`;
  }
}
