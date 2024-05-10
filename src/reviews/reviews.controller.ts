import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards } from '@nestjs/common';
    import { ReviewsService } from '../reviews/reviews.service';
    import { CreateReviewDto } from './dto/create-review.dto';
    import { UpdateReviewDto } from './dto/update-review.dto';
    import { AuthGuard } from '@nestjs/passport';
    import { UserInfo } from 'src/utils/userinfo.decorator';
    import { User } from 'src/user/entities/user.entity';
    @Controller('reviews')
    export class ReviewsController {
        constructor(private readonly ReviewsService: ReviewsService) {}
        //리뷰 작성
        @UseGuards(AuthGuard('jwt'))
        @Post()
        create(@UserInfo() user : User, @Body() createReviewDto : CreateReviewDto) {
            return this.ReviewsService.create(user.id, createReviewDto);
        }
        @Get('/list')
        async findByTourId(@Query('tourId') tourId: number) {
            return await this.ReviewsService.findOneByTourId(tourId);
        }
        // 리뷰 상세조회
        @Get('/:reviewId')
        async findOne(@Param('reviewId') reviewId: number) {
            return await this.ReviewsService.findOne(+reviewId);
        }
        //리뷰 수정
        @UseGuards(AuthGuard('jwt'))
        @Patch('/:reviewId')
        update(@Param('reviewId') reviewId: number, @UserInfo() user : User, @Body() updateReviewDto: UpdateReviewDto) {
            return this.ReviewsService.update(+reviewId, user.id, updateReviewDto);
        }
        //리뷰 삭제
        @UseGuards(AuthGuard('jwt'))
        @Delete('/:reviewId')
        remove(@Param('reviewId') reviewId: number, @UserInfo() user : User,) {
            return this.ReviewsService.remove(+reviewId, user.id);
        }
    }