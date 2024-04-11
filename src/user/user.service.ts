import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInfo } from './entities/userinfo.entity';
import { Repository } from 'typeorm';
import { string } from 'joi';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { decrypt } from 'dotenv';
import bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    private jwtservice : JwtService,
    private configservice : ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
) {}

  async signup({ name, password, email, confirmpassword, nickname, phoneNumber, tourType }:CreateUserDto):Promise<{message: string, user : User}> {
    //email 중복 확인
    //user테이블에 데이터를 저장한다.
    const existedUser = await this.userRepository.findOneBy({email})
    if(existedUser)
    throw new BadRequestException ('이미 존재하는 이메일입니다.');

    const matchpassword = password === confirmpassword;
    if(!matchpassword)
      throw new BadRequestException ('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    
    const hashRound = this.configservice.get<number>('PASSWORD_HASH_ROUNDS');

    const hashedPassword = bcrypt.hashSync(password,hashRound);

    const newUser = this.userRepository.create({
      name,
      password:hashedPassword,
      email,
      nickname,
      phoneNumber,
      tourType
    })
    const user = await this.userRepository.save(newUser);
    return this.getToken(user.id);
  }


  // signin
  async signin({ email, password }:SignInDto) {
    const user = await this.userRepository.findOne({where: {email}, select:{id: true, password: true}});
    const isMatch = bcrypt.compareSync(password, user.password);
    if(!user || !isMatch){
      throw new BadRequestException ('사용자가 존재하지 않거나 비밀번호가 일치하지 않습니다.');
    }
    return this.getToken(user.id);
  }

  async getToken(userId: number){
    const payload = {id : userId};
    const accessToken = this.jwtservice.sign(payload);
    return accessToken;
  }

  async getUser(userId: number){
    const user = await this.userRepository.findOne({ where: {id:userId }});
    if(!user){
      throw new NotFoundException ('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(userId: number) {
    const user = await this.getUser(userId)
    await this.userRepository.delete({id:user.id})
  }
}
