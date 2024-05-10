import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { FindAllTourDto } from './dto/findAll-tour.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userinfo.decorator';
import { Guide } from 'src/guide/entities/guide.entity';

@Controller('tour')
export class TourController {
  constructor(
    private readonly tourService: TourService,
    private readonly configService: ConfigService,
  ) {}

  // configService 써보자...

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UserInfo() guide: Guide,
    @Body() createTourDto: CreateTourDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    if (file) {
      const s3 = new S3({
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_KEY'),
      });

      try {
        const key = `${Date.now() + file.originalname}`;
        const upload = await s3
          .putObject({
            Key: key,
            Body: file.buffer,
            Bucket: this.configService.get<string>('BUCKET_NAME'),
          })
          .promise();
        console.log(upload);

        const url = `https://gksaprkbucket.s3.ap-northeast-2.amazonaws.com/${key}${file.originalname}`;

        const fileKey = key;

        const tour = await this.tourService.createTour(
          guide.id,
          createTourDto,
          url,
          fileKey,
        );

        return {
          statusCode: HttpStatus.CREATED,
          message: '투어 생성에 성공했습니다.',
          data: tour,
        };
      } catch (error) {
        console.log(error);
      }
    }
  }

  @Get()
  async findAll(@Query() findAllTourDto: FindAllTourDto) {
    const data = await this.tourService.findAllTour(findAllTourDto);

    return {
      statusCode: HttpStatus.OK,
      message: '투어 조회에 성공했습니다.',
      data,
    };
  }

  // 추천 API 작성
  @UseGuards(AuthGuard('jwt'))
  @Get('/recommendation')
  async tourRecommendation(@UserInfo() user: User) {
    const data = await this.tourService.findOneUserRegion(user.id);

    return {
      statusCode: HttpStatus.OK,
      message: '투어 추천조회에 성공했습니다.',
      data,
    };
  }

  // 투어 좋아요 수에 따라 정렬 조회

  @UseGuards(AuthGuard('jwt'))
  @Get('/like-order')
  async tourLikeOrder(@UserInfo() user: User) {
    const data = await this.tourService.tourLikeOrder(user.id, user.tourType);

    return {
      statusCode: HttpStatus.OK,
      message: '투어 좋아요 정렬에 성공했습니다.',
      data,
    };
  }

  // 상세조회
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.tourService.findOne(+id);

    return {
      statusCode: HttpStatus.OK,
      message: '투어 상세조회에 성공했습니다.',
      data,
    };
  }

  // 투어 수정 + 가이드 추가 해야됨
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @UserInfo() guide: Guide,
    @Param('id') id: string,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    const data = await this.tourService.updateTour(
      guide.id,
      +id,
      updateTourDto,
    );

    return {
      statusCode: HttpStatus.OK,
      message: '투어 수정에 성공했습니다.',
      data,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@UserInfo() guide: Guide, @Param('id') id: string) {
    const data = await this.tourService.removeTour(guide.id, +id);

    return {
      statusCode: HttpStatus.OK,
      message: '투어 삭제에 성공했습니다.',
      data,
    };
  }

  // 투어 좋아요 기능
  @UseGuards(AuthGuard('jwt'))
  @Post('/like')
  async createLike(
    @UserInfo() user: User,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    try {
      const data = await this.tourService.createLike(user.id, createLikeDto);

      return {
        statusCode: HttpStatus.OK,
        message: '좋아요 성공했습니다.',
        data,
      };
    } catch (error) {
      // 예외 처리
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: '이미 좋아요를 눌렀습니다. 좋아요 생성이 안됩니다', // 예외 메시지 반환
      };
    }
  }

  // 투어 좋아요 취소 기능
  @UseGuards(AuthGuard('jwt'))
  @Post('/dislike')
  async createDisLike(
    @UserInfo() user: User,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    try {
      const data = await this.tourService.createDisLike(user, createLikeDto);

      return {
        statusCode: HttpStatus.OK,
        message: '좋아요를 취소했습니다.',
        data,
      };
    } catch (error) {
      // 예외 처리
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: '이미 좋아요 취소를 눌렀습니다. 좋아요 취소가 안됩니다.', // 예외 메시지 반환
      };
    }
  }
}
