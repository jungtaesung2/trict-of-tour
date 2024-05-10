import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { DataSource, Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllTourDto } from './dto/findAll-tour.dto';
import { User } from 'src/user/entities/user.entity';
import { TourLike } from './entities/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Guide } from 'src/guide/entities/guide.entity';
import { Tour } from './entities/tour.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { TourType } from './types/tourtypes.enum';

@Injectable()
export class TourService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Guide)
    private readonly guideRepository: Repository<Guide>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @InjectRepository(TourLike)
    // private readonly tourLikeRepository: Repository<TourLike>,
    private readonly configService: ConfigService,
  ) {}
  async createTour(
    guideId: number,
    createTourDto: CreateTourDto,
    url: string,
    fileKey: string,
  ) {
    const {
      title,
      startDate,
      endDate,
      price,
      tourType,
      people,
      content,
      latitude,
      longitude,
      regionId,
    } = createTourDto;

    const guide = await this.guideRepository.findOne({
      where: { id: guideId },
    });

    if (!guide) {
      throw new BadRequestException('가이드가 존재하지 않습니다.');
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

    // 시간 메서드 따로 구분할 수 있는거
    //  시작일 , 만기일 두가지로 가능
    //if (startDate >= endDate) { throw new BadRequestException('시작일은 종료일보다 이전이어야 합니다.'); }

    const today = new Date();
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    if (isNaN(newStartDate.getTime())) {
      throw new BadRequestException('유효한 시작일 날짜 형식이 아닙니다.');
    }

    if (isNaN(newEndDate.getTime())) {
      throw new BadRequestException('유효한 만기일 날짜 형식이 아닙니다.');
    }

    if (newStartDate.getTime() < today.getTime()) {
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

    //  지역id 가지고 오면 지역이름으로 대체가 되야는데
    const region = await this.regionRepository.findOneBy({ id: regionId });

    if (!region) {
      throw new NotFoundException('해당 지역을 찾을 수 없습니다.');
    }

    const tour = await this.tourRepository.save({
      title,
      startDate,
      endDate,
      price,
      tourType,
      people,
      image: url,
      content,
      latitude,
      longitude,
      region: { id: regionId },
      fileKey,
      guide: guide,
    });
    return tour;
  }

  // 투어 조회 >> 메인페이지에 있는 가이드가 등록한 투어가 보여야한다.검색 기능추가
  async findAllTour({ keyword, tourType }: FindAllTourDto) {
    const searchTour = this.tourRepository.createQueryBuilder('tour');

    if (keyword) {
      searchTour.where(
        '(tour.title LIKE :keyword OR tour.content LIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }

    if (tourType) {
      searchTour.andWhere('tour.tourType = :tourType', { tourType });
    }

    const tours = await searchTour.getMany();

    return tours;
  }

  // 투어 추천 조회
  async findOneUserRegion(userId: number) {
    //  유저 존재 여부
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 유저 투어타입 찾기 , 투어타입(투어전체 끌고오기) 찾기 >> 서로 일치하는지 여부 확인!
    // 투어전체 가지고 올 때 배열로 가지고 와야 편한다. 투어타입별로 정렬!. >> 매칭 시키자!
    const userTourType = user.tourType;
    const allTours = await this.tourRepository.find();

    // 사용자의 tourType과 일치하는 투어 필터링
    const matchTourTypeTours = allTours.filter(
      (tour) => tour.tourType === userTourType,
    );

    return matchTourTypeTours;
  }

  // 투어 좋아요 수에 따라 정렬 조회

  async tourLikeOrder(userId: number, tourType: TourType) {
    const matchTourType = await this.tourRepository.find({
      where: { tourType },
    });

    const tourLikeOrder = matchTourType.sort(
      (a, b) => b.likeCount - a.likeCount,
    );

    return tourLikeOrder;
  }

  // 투어 상세 조회
  async findOne(id: number) {
    const tour = await this.tourRepository.findOne({
      where: { id },
      relations: { region: true },
    });

    if (!tour) {
      throw new NotFoundException('투어가 없습니다.');
    }

    // tour.region = tour.region.regionName

    return {
      id: tour.id,
      // guideId: tour.guideId,
      title: tour.title,
      startDate: tour.startDate,
      endDate: tour.endDate,
      price: tour.price,
      tourType: tour.tourType,
      people: tour.people,
      image: tour.image,
      content: tour.content,
      latitude: tour.latitude,
      longitude: tour.longitude,
      region: tour.region.regionName,
    };
  }

  // 투어 수정 guideId: number
  async updateTour(guideId: number, id: number, updateTourDto: UpdateTourDto) {
    const { title, image } = updateTourDto;

    const guide = await this.guideRepository.findOneBy({ id: guideId });
    if (!guide) {
      throw new NotFoundException('가이드가 아닙니다. 수정할 권한이 없습니다.');
    }

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
  async removeTour(guideId: number, id: number) {
    const guide = await this.guideRepository.findOneBy({ id: guideId });
    if (!guide) {
      throw new NotFoundException('가이드가 아닙니다. 삭제할 권한이 없습니다.');
    }

    // 투어 확인
    const findTour = await this.tourRepository.findOneBy({ id });
    if (!findTour) {
      throw new BadRequestException('등록된 투어가 없습니다.');
    }

    if (findTour.fileKey) {
      const s3 = new S3({
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_KEY'),
      });

      const deleteParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: findTour.fileKey,
      };

      await s3.deleteObject(deleteParams).promise();
    }

    await this.tourRepository.delete({ id });
  }

  // 투어 좋아요 기능  // 좋아요 숫자가 보이게 해야한다.(등록된 투어에) 인기순으로 나열.
  async createLike(userId: number, { tourId }: CreateLikeDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 투어가 존재하는지 확인
      console.log(tourId);
      const tour = await queryRunner.manager.findOne(Tour, {
        where: { id: tourId },
      });

      if (!tour) {
        throw new NotFoundException('해당 투어 정보가 없습니다.');
      }

      // 사용자가 이미 해당 투어를 좋아요 했는지 확인
      const existingLike = await queryRunner.manager.findOne(TourLike, {
        where: { tour: { id: tourId }, user: { id: userId } },
      });
      // 투어에 좋아요가 없다면 좋아요 생성
      if (!existingLike) {
        await queryRunner.manager.save(TourLike, {
          tour: { id: tourId },
          user: { id: userId },
        });

        // 좋아요 수 증가
        await queryRunner.manager.update(Tour, tourId, {
          likeCount: tour.likeCount + 1,
        });
      } else {
        throw new BadRequestException('이미 좋아요를 눌렀습니다!');
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  // 좋아요 취소 --------
  async createDisLike(user: User, { tourId }: CreateLikeDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 투어가 존재하는지 확인
      const tour = await queryRunner.manager.findOne(Tour, {
        where: { id: tourId },
      });

      if (!tour) {
        throw new NotFoundException('해당 투어 정보가 없습니다.');
      }

      // 사용자가 해당 투어를 좋아요 했는지 확인
      const existingLike = await queryRunner.manager.findOne(TourLike, {
        where: { tour: { id: tourId }, user: { id: user.id } },
      });
      // 투어에 좋아요가 있다면 좋아요 취소
      if (existingLike) {
        await queryRunner.manager.delete(TourLike, existingLike.id);
        // 투어의 좋아요 수 감소
        await queryRunner.manager.update(Tour, tourId, {
          likeCount: tour.likeCount - 1,
        });
      } else {
        throw new BadRequestException('이미 좋아요 취소를 눌렀습니다!');
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }
}
