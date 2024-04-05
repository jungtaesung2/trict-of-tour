import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from 'src/tour/entities/tour.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>,
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
    ) {}

    async create(tourId : number, createReviewDto: CreateReviewDto): Promise<{review: Review}> {
        const tour = await this.tourRepository.find({where : {id:tourId}});
        if (!tour) {
            throw new NotFoundException(`해당하는 투어가 없습니다.`);
        }
        const reservation = await this.reservationRepository.find({where : {id:createReviewDto.reservationId}});
        if (!reservation) {
            throw new NotFoundException(`해당하는 예약이 없습니다.`);
        }
        //reservation의 userid랑 로그인한 userid랑 일치하는지!
      
      const newReview = {
          comment: createReviewDto.comment,
          star: createReviewDto.star,
          reservationId : createReviewDto.reservationId,
          image: createReviewDto.image,
          tour : {id : tourId}
        };
        const createReview = await this.reviewRepository.create(newReview);
        this.reviewRepository.save(createReview)
        return {review:createReview}
    }
    // 리뷰 조회
    async findOne(reviewId: number): Promise<Review> {
      return this.reviewRepository.findOne({ where: { id : reviewId } });
  }
    
    //리뷰 전체조회
    async findAll(tourId: number): Promise<Review[]> {
      return this.reviewRepository.find({ where: { id : tourId } });
  }
    //리뷰 수정
    async update(reviewId: number, updateReviewDto: UpdateReviewDto): Promise<{review: Review}> {
        const review = await this.findOne(reviewId);
        if(!review){
          throw new NotFoundException("해당하는 Id의 리뷰를 찾을 수 없습니다.")
        }
        await this.reviewRepository.update(reviewId, updateReviewDto);
        const updateReview = await this.reviewRepository.findOne({where : {id : reviewId}})
        if(!updateReview){
          throw new NotFoundException("수정된 리뷰를 찾을 수 없습니다.")
        }
        
        return {review:updateReview}
    }
    // userid review의 userid랑 같은지?

    //리뷰 삭제
    async remove(reviewId: number): Promise<{message : string}> {
      const review = await this.findOne(reviewId);
      if(!review){
        throw new NotFoundException("해당하는 Id의 리뷰를 찾을 수 없습니다.")
      }
        await this.reviewRepository.delete(reviewId);
        return {message:"리뷰가 삭제되었습니다"}
    }
}

