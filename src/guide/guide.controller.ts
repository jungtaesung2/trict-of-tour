import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { SignInGuideDto } from './dto/signin-guide.dto';
import { Response } from 'express';
import { UserInfo } from 'src/utils/userinfo.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('guide')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Post('signup')
  async signup(
    @Body() createGuideDto: CreateGuideDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.guideService.signup(createGuideDto);
    res.cookie('authorization', `Bearer ${accessToken}`);
    console.log('authorization', accessToken);
    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입에 성공했습니다.',
    };
  }

  @Post('signin')
  async signin(
    @Body() signInGuideDto: SignInGuideDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.guideService.signin(signInGuideDto);
    res.cookie('authorization', `Bearer ${accessToken}`);
    console.log('authorization', `Bearer ${accessToken}`);
    return {
      statusCode: HttpStatus.CREATED,
      message: '로그인에 성공하였습니다.',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@UserInfo() guide) {
    console.log(guide);
    return this.guideService.getGuide(guide.id);
  }

  @Get()
  findAll() {
    return this.guideService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guideService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guideService.update(+id, updateGuideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guideService.remove(+id);
  }
}
