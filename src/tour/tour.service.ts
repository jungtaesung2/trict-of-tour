import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Tour } from './entities/tour.entity';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    // @InjectRepository(Guide)
    // private readonly guideRepository: Repository<Guide>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}
  async createTour(createTourDto: CreateTourDto) {
    const {
      guideId,
      regionId,
      title,
      startDate,
      endDate,
      price,
      tourType,
      people,
      image,
      content,
      latitude,
      longitude,
    } = createTourDto;

    // 가이드 존재 확인
    // const guide = await this.guideRepository.findOne({
    //   where: { id: guideId },
    // });

    // if (!guide) {
    //   throw new BadRequestException('가이드가 존재하지 않습니다.');
    // }

    // 지역설정
    const region = await this.regionRepository.findOne({
      where: { id: regionId },
    });
    if (region) {
      throw new BadRequestException('지역이 존재하지 않습니다.');
    }

    // 날짜 설정
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    const pattern2 = /^\d{4}-\d{2}-\d{2}$/;
    if (typeof startDate !== 'string' || !pattern.test(startDate)) {
      throw new BadRequestException(
        "날짜 형식이 유효하지 않습니다. 'YYYY-MM-DD' 형식으로 입력해주세요. 시작일입니다.",
      );
    }
    if (typeof endDate !== 'string' || !pattern2.test(endDate)) {
      throw new BadRequestException(
        "날짜 형식이 유효하지 않습니다. 'YYYY-MM-DD' 형식으로 입력해주세요. 만기일입니다.",
      );
    }

    const today = new Date();
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    if (isNaN(newStartDate.getTime())) {
      throw new BadRequestException('유효한 시작일 날짜 형식이 아닙니다.');
    }

    if (isNaN(newEndDate.getTime())) {
      throw new BadRequestException('유효한 만기일 날짜 형식이 아닙니다.');
    }

    if (newStartDate.getTime() > today.getTime()) {
      throw new BadRequestException('시작일은 오늘 이후여야 합니다.');
    }

    if (newEndDate.getTime() <= newStartDate.getTime()) {
      throw new BadRequestException('만기일은 시작일 이후여야 합니다.');
    }

    // 투어타입 그대로

    // 인원 제한 엔티티에 재현
    if (
      parseInt(createTourDto.people) < 1 ||
      parseInt(createTourDto.people) > 10
    ) {
      throw new BadRequestException('인원은 1명이상 10명 이하여야합니다.');
    }

    const tour = await this.tourRepository.save({
      guideId,
      regionId,
      title,
      startDate,
      endDate,
      price,
      tourType,
      people,
      image,
      content,
      latitude,
      longitude,
    });
    return tour;
  }

  // 투어 조회 >> 메인페이지에 있는 가이드가 등록한 투어가 보여야한다.
  // async findAll(guideId: number) {
  //   return await this.tourRepository.findOneBy({ where: guideId });
  // }

  // 투어 상세 조회
  async findOne(id: number) {
    const tour = await this.tourRepository.findOneBy({ id });

    if (!tour) {
      throw new NotFoundException('투어가 없습니다.');
    }

    return tour;
  }

  // 투어 수정 guideId: number
  async updateTour(id: number, updateTourDto: UpdateTourDto) {
    const { title, image } = updateTourDto;

    // const guide = await this.guideRepository.findOneBy({ id: guideId });
    // if(!guide){
    //   throw new NotFoundException('가이드가 아닙니다. 수정할 권한이 없습니다.')
    // }

    const tour = await this.tourRepository.findOneBy({ id });

    if (!tour) {
      throw new NotFoundException('등록된 투어를 찾을 수 없습니다.');
    }

    await this.tourRepository.update(id, {
      title,
      image,
    });

    return this.tourRepository.findOneBy({ id });
  }

  // 투어 삭제
  async removeTour(id: number) {
    // 투어 확인
    const tour = await this.tourRepository.findOneBy({ id });
    if (!tour) {
      throw new BadRequestException('등록된 투어가 없습니다.');
    }

    // 가이드 확인
    //   if (tour.guideId !== guideId) {
    //     throw new BadRequestException('삭제할 권한이 없습니다.');
    //   }

    await this.tourRepository.delete({ id });
  }
}
