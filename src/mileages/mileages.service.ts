import { Injectable, NotFoundException } from '@nestjs/common';
import { Mileage } from './entities/mileages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMileageDto } from './dto/create-mileages.dto';
import { Review } from 'src/reviews/entities/review.entity';


@Injectable()
export class MileagesService {
    reviewRepository: any;userRepository: any;
constructor(
    // @InjectRepository(User)
    // private readonly UserRepository: Repository<User>,
    @InjectRepository(Mileage)
    private readonly mileageRepository: Repository<Mileage>,        
) {}

    async create(userId : number, reviewId : number, createMileageDto: CreateMileageDto): Promise<{message : string, mileage: Mileage}> {
    const user = await this.userRepository.findOne({where : {id : userId}});
    if (!user) {
        throw new NotFoundException(`해당하는 ID의 유저가 없습니다.`);
    }
    const newMileage = this.mileageRepository.create({mileageAmount : createMileageDto.mileageAmount})
    const chargedMileage = await this.mileageRepository.save(newMileage)
    return {message : '마일리지 충전이 성공적으로 완료되었습니다.', mileage : chargedMileage}
    }


    async findmyMileage(mileageId: number): Promise<Review> {
        return this.reviewRepository.findOne({ where: { id : mileageId } });
    }

    async findOne(reviewId: number): Promise<Review> {
        return this.reviewRepository.findOne({ where: { id : reviewId } });
    }
}

