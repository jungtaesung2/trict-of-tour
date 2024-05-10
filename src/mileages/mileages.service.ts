import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
    import { Mileage } from './entities/mileages.entity';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { CreateMileageDto } from './dto/create-mileages.dto';
    import { Review } from 'src/reviews/entities/review.entity';
    import { User } from 'src/user/entities/user.entity';
    import { MileageHistory } from './entities/mileageHistory.entity';
    @Injectable()
    export class MileagesService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Mileage)
        private readonly mileageRepository: Repository<Mileage>,
        @InjectRepository(MileageHistory)
        private readonly MileageHistoryRepository: Repository<MileageHistory>,
    ) {}
         //마일리지 지급
        async addMileage(userId: number, addMileage: number, reason : string): Promise<void> {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException(`해당하는 ID의 유저가 없습니다.`);
            }
            let mileage = await this.mileageRepository.findOne({relations : ['user'], where : {user : {id : userId}}});
            if (!mileage) {
                mileage = this.mileageRepository.create({ user, mileageAmount: addMileage });
            }
            const balance = mileage.mileageAmount + addMileage;
            mileage.mileageAmount = balance;
            await this.mileageRepository.save(mileage);
            const MileageHistory = this.MileageHistoryRepository.create({user : {id : mileage.user.id}, changeAmount : addMileage, balance, reason})
            await this.MileageHistoryRepository.save(MileageHistory)
        }
        // 마일리지 사용
        async useMileage(userId: number, usedMileage: number, reason : string): Promise<void> {
            const mileage = await this.mileageRepository.findOne({relations: ['user'], where : {user : {id : userId}}});
            if (!mileage) {
            throw new NotFoundException(`해당하는 ID의 마일리지가 없습니다.`);
            }
            if (usedMileage > mileage.mileageAmount) {
            throw new BadRequestException(`마일리지 잔액이 부족합니다.`);
            }
            const balance = mileage.mileageAmount - usedMileage;
            mileage.mileageAmount = balance;
            await this.mileageRepository.save(mileage);
            const MileageHistory = this.MileageHistoryRepository.create({user : {id : mileage.user.id}, changeAmount : -usedMileage, balance, reason})
            await this.MileageHistoryRepository.save(MileageHistory)
        }
        //마일리지 조회
        async findmyMileage(userId : number): Promise<Mileage> {
            if (!userId) {
                throw new NotFoundException(`해당하는 ID의 유저가 없습니다.`);
            }
            return this.mileageRepository.findOne({ where: { user : {id : userId} } });
        }
        // 마일리지 상세조회
        async findmyMileageHistory(userId : number): Promise<MileageHistory[]> {
            if (!userId) {
                throw new NotFoundException(`해당하는 ID의 유저가 없습니다.`);
            }
            console.log(userId)
            return this.MileageHistoryRepository.find({ where: { user : {id : userId} } });
            };
            
        // 마일리지 삭감    
        async deductMileage(userId: number, deductedMileage: number, reason: string): Promise<void> {
                const mileage = await this.mileageRepository.findOne({ relations: ['user'], where: { user: { id: userId } } });
                if (!mileage) {
                    throw new NotFoundException(`해당하는 ID의 마일리지가 없습니다.`);
                }
                if (deductedMileage > mileage.mileageAmount) {
                    throw new BadRequestException(`마일리지 잔액이 부족합니다.`);
                }
                const balance = mileage.mileageAmount - deductedMileage;
                mileage.mileageAmount = balance;
                await this.mileageRepository.save(mileage);
                const MileageHistory = this.MileageHistoryRepository.create({ user: { id: mileage.user.id }, changeAmount: -deductedMileage, balance, reason })
                await this.MileageHistoryRepository.save(MileageHistory)
            }
        }
        