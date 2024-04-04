import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';
import { Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';
import { Tour } from '../tour/entities/tour.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Status } from './types/status.type';
import { privateDecrypt } from 'crypto';

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

  // 02. 예약 취소
  async requestCancellation(
    UpdateReservationDto: UpdateReservationDto,
    reservationId: number,
    userId: number,
  ): Promise<{ message: string }> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('해당 예약을 찾을 수 없습니다.');
    }

    if (!UpdateReservationDto.cancelReason) {
      throw new BadRequestException('취소 이유를 제공해야 합니다.');
    }

    if (reservation.isCancelled) {
      // 이미 취소된 예약인지 확인
      throw new BadRequestException('이미 취소된 예약입니다.');
    }

    if (!(await this.canCancelReservation(reservationId))) {
      throw new BadRequestException('예약을 취소할 수 있는 기간이 아닙니다.');
    }

    // 취소 이유 업데이트
    reservation.cancelReason = UpdateReservationDto.cancelReason;

    // 소프트 삭제를 통해 예약 취소 처리
    reservation.isCancelled = true;

    await this.reservationRepository.save(reservation);

    return {
      message: '해당 예약이 취소되었습니다.',
    };
  }
  async canCancelReservation(reservationId: number): Promise<boolean> {
    const reservation = await this.findReservationById(reservationId);

    const tourStartDate: Date = reservation.date;
    console.log('투어 시작일:', tourStartDate);

    let currentDate = new Date();
    console.log('현재 날짜:', currentDate);

    // 예약 취소 가능한 시간 범위 설정 (예: 투어 시작 전 48시간까지만 취소 가능)
    const cancelDeadline = new Date(
      tourStartDate.getTime() - 48 * 60 * 60 * 1000,
    );

    console.log('취소데드라인', cancelDeadline);
    // 현재 날짜가 취소 데드라인보다 이전이면 취소 가능
    return currentDate < cancelDeadline;
  }

  async getCancelledReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { isCancelled: true },
    });
  }

  private async findReservationById(
    reservationId: number,
  ): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw new NotFoundException('해당 예약을 찾을 수 없습니다.');
    }
    return reservation;
  }

  // 예약 조회 메서드
  async findAllmyReservations(userId: number): Promise<Reservation[]> {
    return await this.reservationRepository.find({ where: { userId } });
  }

  // 특정 예약 상세 조회
  async findOne(reservationId: number): Promise<Reservation> {
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

    switch (status) {
      case Status.CANCEL:
        reservations = await this.reservationRepository.find({
          where: { status: Status.CANCEL },
        });
        break;
      case Status.ONGOING:
        reservations = await this.reservationRepository.find({
          where: { status: Status.ONGOING },
        });
        break;
      case Status.FINISH:
        reservations = await this.reservationRepository.find({
          where: { status: Status.FINISH },
        });
        break;
      default:
        throw new Error('올바르지 않은 상태입니다.');
    }

    return reservations;
  }
}
