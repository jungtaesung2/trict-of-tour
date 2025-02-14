import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';
import { DataSource, LessThan, Not, Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';
import { Tour } from '../tour/entities/tour.entity';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { Status } from './types/status.type';
import { User } from 'src/user/entities/user.entity';
import { MileagesService } from 'src/mileages/mileages.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly mileageService: MileagesService
  ) {}

  // 02. 예약 작성 메서드
  async create(
    CreateReservationDto: CreateReservationDto,
    userId: number,
    tourId: number,
  ): Promise<{ message: string; reservation: Reservation }> {
    const queryRunner =
      this.reservationRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.createReservation(
        queryRunner,
        CreateReservationDto,
        userId,
        tourId,
      );

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error; // 에러 재 throw
    } finally {
      // QueryRunner 반환
      await queryRunner.release();
    }
  }

  async createReservation(
    queryRunner: any, // QueryRunner 대신 any 타입으로 지정
    CreateReservationDto: CreateReservationDto,
    userId: number,
    tourId: number,
  ): Promise<{ message: string; reservation: Reservation }> {
    // 투어 정보 가져오기
    const tour = await this.tourRepository.findOne({ where: { id: tourId } });
    console.log('투어Id', tour);

    if (!tour) {
      throw new NotFoundException('해당하는 투어를 찾지 못하였습니다.');
    }

    // 사용자 정보 가져오기
    const user = await this.userRepository.findOne({ where: { id: userId } });
    console.log('유저정보가져오기', user);

    if (!user) {
      throw new NotFoundException('해당하는 사용자를 찾지 못하였습니다.');
    }

    const selectDate = new Date(CreateReservationDto.date);

    const isDateValid = await this.isDateValid(tourId, selectDate);
    if (!isDateValid) {
      throw new Error('선택한 날짜에 예약을 할 수 없습니다.');
    }

    const pricePerPerson: number = +tour.price.replace(',', '');
    const paymentAmount: number = +pricePerPerson * CreateReservationDto.people;

    const firstnameRegex = /^[a-zA-Z\s]*$/;
    const lastnameRegex = /^[a-zA-Z\s]*$/;

    if (
      !firstnameRegex.test(CreateReservationDto.firstname) ||
      !lastnameRegex.test(CreateReservationDto.lastname)
    ) {
      throw new BadRequestException('영어 이름이 작성되어야 합니다.');
    }

    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (
      typeof CreateReservationDto.date !== 'string' ||
      !pattern.test(CreateReservationDto.date)
    ) {
      throw new BadRequestException(
        "날짜 형식이 유효하지 않습니다. 'YYYY-MM-DD' 형식으로 입력해주세요.",
      );
    }

    if (
      !CreateReservationDto.date ||
      !CreateReservationDto.people ||
      !CreateReservationDto.firstname ||
      !CreateReservationDto.lastname ||
      !CreateReservationDto.specialRequests
    ) {
      throw new BadRequestException(
        '날짜,인원수,firstname,lastname, 요청사항은 필수 입력 사항입니다.',
      );
    }

    const newReservation = this.reservationRepository.create({
      date: selectDate,
      paymentAmount: paymentAmount.toString(),
      people: CreateReservationDto.people,
      firstname: CreateReservationDto.firstname,
      lastname: CreateReservationDto.lastname,
      specialRequests: CreateReservationDto.specialRequests,
      tour: tour,
      user: user,
    });

    // 예약 정보 저장
    const createdReservation = await queryRunner.manager.save(newReservation);
    
    //마일리지 사용기능
    await this.mileageService.useMileage(userId, paymentAmount, `reservationId:${createdReservation.id} 예약 생성`);
    return {
      message: '예약이 성공적으로 완료되었습니다.',
      reservation: createdReservation,
    };
  }

  // 01.예약 가능한 날짜 확인 메서드
  async isDateValid(tourId: number, reservationDate: Date): Promise<boolean> {
    const tour = await this.tourRepository.findOne({
      where: { id: tourId },
      select: ['startDate', 'endDate'],
    });

    if (!tour) {
      throw new NotFoundException(
        '해당하는 투어의 정보를 불러오지 못했습니다.',
      );
    }

    const startDate = new Date(tour.startDate);
    const endDate = new Date(tour.endDate);

    // const { startDate, endDate } = await this.tourRepository
    //   .createQueryBuilder('tour')
    //   .select('tour.startDate', 'startDate')
    //   .addSelect('tour.endDate', 'endDate')
    //   .where('tour.id = :id', { id: tourId })
    //   .getRawOne();

    // if (!startDate || !endDate) {
    //   throw new NotFoundException(
    //     '해당하는 투어의 정보를 불러오지 못하였습니다.',
    //   );
    // }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startValidDate = new Date(today);
    startValidDate.setDate(startValidDate.getDate() + 1); // 예약은 오늘 이후부터 가능
    const endValidDate = new Date(endDate);

    console.log('today:', today);
    console.log('startValiDate:', startValidDate);
    console.log('endValidDate:', endValidDate);
    console.log(reservationDate)
    return (
      reservationDate >= startValidDate &&
      reservationDate <= endValidDate 
      // reservationDate.getDate() >= startDate.getDate() + 1
    );
  }

  // 유틸리티 메서드로 현재 시간과 취소 데드라인 비교하기
  private isCancellationDeadlinePassed(tourStartDate: Date): boolean {
    const currentDate = new Date();
    const cancelDeadline = new Date(
      tourStartDate.getTime() - 48 * 60 * 60 * 1000,
    );
    console.log('현재날자', currentDate);
    console.log('데드라인', cancelDeadline);
    return currentDate >= cancelDeadline;
  }

  // 취소 가능 여부 확인하기
  async canCancelReservation(reservationId: number): Promise<boolean> {
    const reservation = await this.findReservationById(reservationId);
    const tourStartDate: Date = new Date(reservation.date);
    return !this.isCancellationDeadlinePassed(tourStartDate);
  }

  // 02. 예약 취소
  async requestCancellation(
    reservationId: number,
    cancelReservationDto: CancelReservationDto,
    userId: number,
  ): Promise<{ message: string }> {
    const queryRunner =
      this.reservationRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const reservation = await queryRunner.manager.findOne(Reservation, {
        where: { id: reservationId },
      });

      if (!reservation) {
        throw new NotFoundException('해당 예약을 찾을 수 없습니다.');
      }

      if (!cancelReservationDto.cancelReason) {
        throw new BadRequestException('취소 이유를 제공해야 합니다.');
      }

      if (!(await this.canCancelReservation(reservationId))) {
        throw new BadRequestException('예약을 취소할 수 있는 기간이 아닙니다.');
      }

      if (reservation.status === Status.CANCEL) {
        throw new BadRequestException('이미 취소된 예약입니다.');
      }
      const mileageToDeduct = await this.calculateMileageToDeduct(reservation);

    // 사용자의 마일리지를 삭감
    await this.mileageService.deductMileage(userId, mileageToDeduct, `reservationId:${reservation.id} 예약 취소`);

    // 예약 정보 업데이트
    reservation.status = Status.CANCEL;
    reservation.cancelReason = cancelReservationDto.cancelReason;
    reservation.cancelledAt = new Date();
    await queryRunner.manager.save(reservation);

    await queryRunner.commitTransaction();
      
      // 'active' 컬럼을 false로 설정하여 예약을 비활성화
      // reservation.active = false;

      reservation.status = Status.CANCEL;
      reservation.cancelReason = cancelReservationDto.cancelReason;

      reservation.cancelledAt = new Date();

      await queryRunner.manager.save(reservation);

      await queryRunner.commitTransaction();

      // 소프트 삭제를 수행하여 deletedAt 컬럼에 삭제 시간 기록
      // await this.reservationRepository.softDelete(reservationId);

      return {
        message: '해당 예약이 취소되었습니다.',
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  async calculateMileageToDeduct(reservation: Reservation): Promise<number> {
  const paymentAmount = parseFloat(reservation.paymentAmount);
  // 취소된 예약 금액의 일정 비율을 마일리지로 사용
    const mileageToDeduct = paymentAmount
    return mileageToDeduct;
  }
  // 예약 조회 메서드
  async findAllmyReservations(userId: number): Promise<Reservation[]> {
    return await this.reservationRepository.find({ where: { user : {id : userId} } });
  }

  // 특정 예약 상세 조회
  async findReservationById(reservationId: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('해당 ID의 예약을 찾을 수 없습니다.');
    }
    return reservation;
  }

  async findReservationsByStatus(status: Status): Promise<Reservation[]> {
    let reservations: Reservation[];

    console.log({ status: status });
    reservations = await this.reservationRepository.find({
      where: { status: status },
    });

    return reservations;
  }

  async processCompletedReservations() {
    try {
      // 현재 시간 이후에 완료된 예약을 조회
      const currentTime = new Date();
      const completedReservations = await this.reservationRepository.find({
        where: { date: LessThan(currentTime), status: Not(Status.CANCEL) },
      });

      // 조회된 예약들의 상태를 "완료"로 변경하고 저장
      const updatePromises = completedReservations.map(async (reservation) => {
        reservation.status = Status.FINISH;
        await this.reservationRepository.save(reservation);
      });

      // 모든 예약 상태 변경 작업이 완료될 때까지 기다림
      await Promise.all(updatePromises);

      console.log('All reservations updated successfully.');
    } catch (error) {
      console.error('Error processing completed reservations:', error);
    }
  }
}
