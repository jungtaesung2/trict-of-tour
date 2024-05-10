import { PickType } from '@nestjs/mapped-types';
import { Review } from '../entities/review.entity';
import { IsNotEmpty } from 'class-validator';
export class CreateReviewDto extends PickType(Review, 
    ['comment', 'star', 'image']) {
    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    star: number;

    @IsNotEmpty()
    image : string

    reservationId : number
}
