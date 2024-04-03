import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
    createReview(CreateReviewDto: CreateReviewDto) {
      throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const review = this.reviewRepository.create(createReviewDto);
        return this.reviewRepository.save(review);
    }

    async findAll(): Promise<Review[]> {
        return this.reviewRepository.find();
    }

    // async findByTourId(tourId: number){
    //     return this.reviewRepository.findOne({ where: { tourId } });
    // }

    async findOne(reviewid: number): Promise<Review> {
        return this.reviewRepository.findOne({ where: { id : reviewid } });
    }

    async update(reviewid: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
        const review = await this.findOne(reviewid);
        if (!review) {
            return null;
        }
        return this.reviewRepository.save(review);
    }

    async remove(reviewid: number): Promise<void> {
        await this.reviewRepository.delete(reviewid);
    }
}
