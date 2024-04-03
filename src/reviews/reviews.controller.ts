import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('Reviews')
export class ReviewsController {
    constructor(private readonly ReviewsService: ReviewsService) {}

    //리뷰 작성

    @Post()
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.ReviewsService.create(createReviewDto);
    }
    // 리뷰 조회
    @Get()
    findOne(@Param('reviews') reviews: string) {
        return this.ReviewsService.findOne(+reviews);
    }
    
    //리뷰 전체조회

    // @Get('tour/:tourId')
    // findByTourId(@Param('tourId') tourId: string) {
    //     return this.ReviewsService.findByTourId(+tourId);
    // }
    
    //리뷰 수정
    @Patch(':reviewid')
    update(@Param('reviewid') reviewid: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.ReviewsService.update(+reviewid, updateReviewDto);
    }

    //리뷰 삭제
    @Delete(':reviewid')
    remove(@Param('reviewid') reviewid: string) {
        return this.ReviewsService.remove(+reviewid);
    }
}