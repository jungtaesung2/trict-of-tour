import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';


@Controller('reviews')
export class ReviewsController {
    constructor(private readonly ReviewsService: ReviewsService) {}

    //리뷰 작성

    @Post()
    create(@Param('tourId') tourId : number, @Body() createReviewDto : CreateReviewDto) {
        return this.ReviewsService.create(tourId, createReviewDto);
    
    // 리뷰 전체조회
    }
    @Get()
    findByTourId(@Query('tourId') tourId : string) {
        console.log(tourId)
        return this.ReviewsService.findAll(+tourId);
    }
    // 리뷰 상세조회
    @Get(':reviewId')
    findOne(@Param('reviewId') reviewId: number) {
        return this.ReviewsService.findOne(+reviewId);
    }
    
    //리뷰 수정
    @Patch(':reviewId')
    update(@Param('reviewId') reviewId: number, @Body() updateReviewDto: UpdateReviewDto) {
        return this.ReviewsService.update(+reviewId, updateReviewDto);
    }

    //리뷰 삭제
    @Delete(':reviewId')
    remove(@Param('reviewId') reviewId: number) {
        return this.ReviewsService.remove(+reviewId);
    }
}