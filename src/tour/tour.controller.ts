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
} from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createTourDto: CreateTourDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // if (file) {
    //   const s3 = new S3({
    //     accessKeyId: process.env.S3_ACCESSKEY,
    //     secretAccessKey: process.env.S3_SECRETKEY,
    //   });

    //   try {
    //     const key = `${Date.now()}_${file.originalname}`;
    //     const upload = await s3
    //       .putObject({
    //         Key: key,
    //         Body: file.buffer,
    //         Bucket: process.env.BUCKET_NAME,
    //       })
    //       .promise();

    //     const tour = await this.tourService.createWithFile(createTourDto, key);

    //     if (tour) {
    //       return { message: '투어생성 완료', tour };
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    const data = await this.tourService.createTour(createTourDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: '투어 생성에 성공했습니다.',
      data,
    };
  }

  // @Get()
  // async findAll() {
  //   const data = await this.tourService.findAll();

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: '투어 조회에 성공했습니다.',
  //     data,
  //   };
  // }

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
