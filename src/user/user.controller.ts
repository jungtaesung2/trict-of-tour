import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PassThrough } from 'stream';
import { Response } from 'express';
import { STATUS_CODES, request } from 'http';
import { JwtAuthGuard } from './guards/jwtguard';
import { SignInDto } from './dto/signin.dto';



@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res({passthrough:true}) res:Response) {
    const accessToken = await this.userService.signup(createUserDto);
    res.cookie('authorization', `Bearer ${accessToken}`);
    return { statusCode: HttpStatus.CREATED,
      message: '회원가입에 성공했습니다.' };
  };

  //singnup에 맞게 signindto를 써서 바꾸기.
  @Post('signin')
  async signin(@Body() signinDto: SignInDto, @Res({passthrough:true}) res:Response) {
    const accessToken = await this.userService.signin(signinDto);
    res.cookie('authorization', `Bearer ${accessToken}`);
    return { statusCode : HttpStatus.CREATED ,
      message : '로그인에 성공하였습니다.'
    };
  };

  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req()req:Request) {
    const userId = req.user.id;
    return this.userService.getUser(userId);
  }

  //위랑 비슷하게
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Req()req:Request) {
    const userId = req.user.id;
    return this.userService.getUser(userId);
  }
  
  @UseGuards(JwtAuthGuard)
  //signout은 토큰을 만료시키면 됩니다.
  @Delete('signout')
  signout(@Param('userId') userId: number) {
    return this.userService.remove(userId);
  }
  
  @UseGuards(JwtAuthGuard)
  //delete
  @Delete('leave')
  leave(@Param('userId') userId: number) {
    return this.userService.remove(userId);
  }
}
