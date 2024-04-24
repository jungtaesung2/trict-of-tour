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
        @Post('/:tourId')
        create(@UserInfo() user : User, @Param() params: { tourId: number, reservationId: number }, @Body() createReviewDto : CreateReviewDto) {
            const userId = user.id
            return this.ReviewsService.create(params.tourId, params.reservationId, userId, createReviewDto);
        }

        @Get('/list')
        async findByTourId(@Query('tourId') tourId: number) {
        console.log(tourId);
        return this.ReviewsService.findOneByTourId(tourId);
    }
        // 리뷰 상세조회
        @Get(':reviewId')
        findOne(@Param('reviewId') reviewId: number) {
            return this.ReviewsService.findOne(+reviewId);
        }
        
        //리뷰 수정
        @Patch(':reviewId')
        update(@Param('reviewId') reviewId: number, userId : number, @Body() updateReviewDto: UpdateReviewDto) {
            return this.ReviewsService.update(+reviewId, userId, updateReviewDto);
        }

        //리뷰 삭제
        @Delete(':reviewId')
        remove(@Param('reviewId') reviewId: number, userId : number) {
            return this.ReviewsService.remove(+reviewId, userId);
        }
    }