    import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
    import { Mileage } from './entities/mileages.entity';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { CreateMileageDto } from './dto/create-mileages.dto';
    import { Review } from 'src/reviews/entities/review.entity';
    import { User } from 'src/user/entities/user.entity';


    @Injectable()
    export class MileagesService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Mileage)
        private readonly mileageRepository: Repository<Mileage>,        
    ) {}

        // 마일리지 충전
        async chargeMileage(userId: number, amount: number): Promise<{ message: string, mileage: Mileage }> {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException(`해당하는 ID의 유저가 없습니다.`);
            }
        
            let userMileage = await this.mileageRepository.findOne({ where: { user } });
            if (!userMileage) {
                userMileage = this.mileageRepository.create({ user, mileageAmount: amount });
            } else {
                userMileage.mileageAmount += amount;
            }
        
            await this.mileageRepository.save(userMileage);
        
            return { message: '마일리지 충전이 성공적으로 완료되었습니다.', mileage: userMileage };
        }

         //마일리지 지급
         async create(userId : number, reviewId : number, createMileageDto: CreateMileageDto): Promise<{message : string, mileage: Mileage}> {
            const user = await this.userRepository.findOne({where : {id : userId}});
            if (!user) {
                throw new NotFoundException(`해당하는 ID의 유저가 없습니다.`);
            }
            if (!reviewId){
                throw new NotFoundException(`해당하는 리뷰를 찾을 수 없습니다.`);
            }
            const newMileage = this.mileageRepository.create({mileageAmount : createMileageDto.mileageAmount})
            const getMileage = await this.mileageRepository.save(newMileage)
    
            return {message : '마일리지 지급이 성공적으로 완료되었습니다.', mileage : getMileage}
            }

        // 마일리지 사용
        async useMileage(mileageId: number, usedMileage: number): Promise<void> {
            const mileage = await this.mileageRepository.findOne({where : {id : mileageId}});
            if (!mileage) {
            throw new NotFoundException(`해당하는 ID의 마일리지가 없습니다.`);
            }
        
            if (usedMileage > mileage.mileageBalance) {
            throw new BadRequestException(`마일리지 잔액이 부족합니다.`);
            }
        
            mileage.mileageBalance -= usedMileage;
            await this.mileageRepository.save(mileage);
        }

        //마일리지 조회
        async findmyMileage(mileageId: number, userId : number): Promise<Mileage> {
            if (!userId) {
                throw new NotFoundException(`해당하는 ID의 유저가 없습니다.`);
            }
            return this.mileageRepository.findOne({ where: { id : mileageId } });
        }

        // 마일리지 상세조회
        async findOne(mileageId: number, userId : number): Promise<Mileage> {
            if (!userId) {
                throw new NotFoundException(`해당하는 ID의 유저가 없습니다.`);
            }
            return this.mileageRepository.findOne({ 
                where : { id: mileageId }, relations: ['mileageHistory']
            });
        }
    }