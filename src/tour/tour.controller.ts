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
} from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { FindAllTourDto } from './dto/findAll-tour.dto';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  // configService 써보자...
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createTourDto: CreateTourDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    if (file) {
      const s3 = new S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      });

      try {
        const key = `${Date.now() + file.originalname}`;
        const upload = await s3
          .putObject({
            Key: key,
            Body: file.buffer,
            Bucket: process.env.BUCKET_NAME,
          })
          .promise();
        console.log(upload);

        const url = `https://gksaprkbucket.s3.ap-northeast-2.amazonaws.com/${key}${file.originalname}`;

        const tour = await this.tourService.createTour(createTourDto, url);

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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    const data = await this.tourService.updateTour(
      +id,

      updateTourDto,
    );

    return {
      statusCode: HttpStatus.OK,
      message: '투어 수정에 성공했습니다.',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.tourService.removeTour(+id);

    return {
      statusCode: HttpStatus.OK,
      message: '투어 삭제에 성공했습니다.',
      data,
    };
  }
}
