import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, Req, ExecutionContext } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PassThrough } from 'stream';
import { Response } from 'express';
import { STATUS_CODES, request } from 'http';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport'; 
import { userInfo } from 'os';
import { UserInfo } from 'src/utils/userinfo.decorator';
import { User } from './entities/user.entity';



@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res({passthrough:true}) res:Response) {
    const accessToken = await this.userService.signup(createUserDto);
    res.cookie('authorization', `Bearer ${accessToken}`);
    console.log(accessToken);
    return { statusCode: HttpStatus.CREATED,
      message: '회원가입에 성공했습니다.' };
  };

  //singnup에 맞게 signindto를 써서 바꾸기.
  @Post('signin')
  async signin(@Body() signinDto: SignInDto, @Res({passthrough:true}) res:Response) {
    const accessToken = await this.userService.signin(signinDto);
    res.cookie('authorization', `Bearer ${accessToken}`);
    console.log(accessToken);
    return { statusCode : HttpStatus.CREATED ,
      message : '로그인에 성공하였습니다.'
    };
  };

  
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@UserInfo() user) {
    console.log(user);
    return this.userService.getUser(user.id);
  }

  //위랑 비슷하게
  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  updateProfile(@UserInfo() user, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  //signout은 토큰을 만료시키면 됩니다.
  @Delete('signout')
  logout(@Req() req:Request, @Res() res: Response): any{
    res.cookie('jwt', '', {
      maxAge: 0
    })
    return res.send({
      message: '로그아웃에 성공하였습니다.'
    })
  }
  
  @UseGuards(AuthGuard('jwt'))
  //delete
  @Delete('leave')
  leave(@UserInfo() user) {
    return this.userService.softdeleteUser(user.id);
  }
}
