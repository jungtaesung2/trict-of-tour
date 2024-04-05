import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';
import { LessThan, Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';
import { Tour } from '../tour/entities/tour.entity';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { Status } from './types/status.type';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  // 01.예약 가능한 날짜 확인 메서드
  async isDateValid(tourId: number, reservationDate: Date): Promise<boolean> {
    const { startDate, endDate } = await this.tourRepository
      .createQueryBuilder('tour')
      .select('tour.startDate', 'startDate')
      .addSelect('tour.endDate', 'endDate')
      .where('tour.id = :id', { id: tourId })
      .getRawOne();

    if (!startDate || !endDate) {
      throw new NotFoundException(
        '해당하는 투어의 정보를 불러오지 못하였습니다.',
      );
    }

    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    return reservationDate >= startDate && reservationDate <= endDate;
  }

  // 02. 예약 작성 메서드
  async create(
    CreateReservationDto: CreateReservationDto,
    userId: number,
    tourId: number,
  ): Promise<{ message: string; reservation: Reservation }> {
    // 투어 정보 가져오기
    const tour = await this.tourRepository.findOne({ where: { id: tourId } });
    // console.log('투어Id', tour);

    if (!tour) {
      throw new NotFoundException('해당하는 투어를 찾지 못하였습니다.');
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
      lastnameRegex.test(CreateReservationDto.lastname)
    ) {
      throw new BadRequestException('영어 이름이 작성되어야 합니다.');
    }

    const newReservation = this.reservationRepository.create({
      date: selectDate,
      paymentAmount: paymentAmount.toString(),
      people: CreateReservationDto.people,
      firstname: CreateReservationDto.firstname,
      lastname: CreateReservationDto.lastname,
      specialRequests: CreateReservationDto.specialRequests,
    });

    // 예약 정보 저장
    const createdReservation =
      await this.reservationRepository.save(newReservation);

    return {
      message: '예약이 성공적으로 완료되었습니다.',
      reservation: createdReservation,
    };
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
    cancelReservationDto: CancelReservationDto,
    reservationId: number,
    userId: number,
  ): Promise<{ message: string }> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('해당 예약을 찾을 수 없습니다.');
    }

    if (!cancelReservationDto.cancelReason) {
      throw new BadRequestException('취소 이유를 제공해야 합니다.');
    }

    if (!reservation.status) {
      throw new BadRequestException('이미 취소된 예약입니다.');
    }

    if (!(await this.canCancelReservation(reservationId))) {
      throw new BadRequestException('예약을 취소할 수 있는 기간이 아닙니다.');
    }

    // 'active' 컬럼을 false로 설정하여 예약을 비활성화
    // reservation.active = false;

    reservation.status = Status.CANCEL;

    reservation.cancelReason = cancelReservationDto.cancelReason;

    // 소프트 삭제를 수행하여 deletedAt 컬럼에 삭제 시간 기록
    await this.reservationRepository.save(reservation);
    // await this.reservationRepository.softDelete(reservationId);

    return {
      message: '해당 예약이 취소되었습니다.',
    };
  }

  // 예약 조회 메서드
  async findAllmyReservations(userId: number): Promise<Reservation[]> {
    return await this.reservationRepository.find({ where: { userId } });
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
        where: { date: LessThan(currentTime) },
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
