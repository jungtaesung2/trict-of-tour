import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReviewDto } from '../reviews/dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from 'src/tour/entities/tour.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { MileagesService } from 'src/mileages/mileages.service';
@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>,
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        private readonly mileageService: MileagesService,
    ) {}
    async create(userId : number, createReviewDto: CreateReviewDto): Promise<{review: Review}> {
        // 기존에 작성한 리뷰가 있는지 확인
        const existReview = await this.reviewRepository.findOne({ where: { reservation: { id: createReviewDto.reservationId}}})
        if (existReview) {
          // 중복된 요청 에러
        }
        // @TODO 트랜잭션이 필요함
        const reservation = await this.reservationRepository.findOne({relations : ['user'], where : {id : createReviewDto.reservationId}});
        if (!reservation) {
            throw new NotFoundException(`해당하는 예약이 없습니다.`);
        }
        if (reservation.user.id !== userId) {
          // unAuthorized Error
        }
        const tour = await this.tourRepository.findOne({where : {id : reservation.tourId}});
        if (!tour) {
          throw new NotFoundException(`해당하는 투어가 없습니다.`);
        }
      const newReview = this.reviewRepository.create({
        comment : createReviewDto.comment,
        star: createReviewDto.star,
        image: createReviewDto.image, // s3업로드
        tour : tour,
        reservation: reservation,
        userId
      });
      const createReview = await this.reviewRepository.save(newReview)
      // 마일리지 추가 로직 필요(userId)
      await this.mileageService.addMileage(userId, 3000, `reviewId:${newReview.id} 리뷰 작성`);
      return { review:createReview }
    }
    // 리뷰 조회
    async findOne(reviewId: number): Promise<Review> {
      return this.reviewRepository.findOne({ where: { id : reviewId } });
    }
    //리뷰 전체조회
    async findOneByTourId(tourId: number): Promise<Review[]> {
      return await this.reviewRepository.find({ where: { tour: { id: tourId } } });
    }
    async Rating(tourId: number): Promise<number> {
      const review = await this.reviewRepository.find({ where: { tour: { id: tourId } } });
      const totalStars = review.reduce((acc, review) => acc + review.star, 0); //acc누적값
      const averageRating = totalStars / review.length;
      return averageRating;
  }
    //리뷰 수정
    async update(reviewId: number, userId : number, updateReviewDto: UpdateReviewDto): Promise<{review: Review}> {
        const review = await this.findOne(reviewId);
        if(!review){
          throw new NotFoundException("해당하는 Id의 리뷰를 찾을 수 없습니다.")
        }
        if (review.userId !== userId) {
          throw new UnauthorizedException("해당 리뷰를 수정할 권한이 없습니다.");
        }
        await this.reviewRepository.update(reviewId, updateReviewDto);
        const updateReview = await this.reviewRepository.findOne({where : {id : reviewId}})
        if(!updateReview){
          throw new NotFoundException("수정된 리뷰를 찾을 수 없습니다.")
        }
        return {review:updateReview}
    }
    //리뷰 삭제
    async remove(reviewId: number, userId : number): Promise<{message : string}> {
      const review = await this.findOne(reviewId);
      if(!review){
        throw new NotFoundException("해당하는 Id의 리뷰를 찾을 수 없습니다.")
      }
      if (review.userId !== userId) {
        throw new UnauthorizedException("해당 리뷰를 삭제할 권한이 없습니다.");
    }
        await this.reviewRepository.delete(reviewId);
        return {message:"리뷰가 삭제되었습니다"}
    }
}