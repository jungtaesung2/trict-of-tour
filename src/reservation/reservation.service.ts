import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';
import { Tour } from '../tour/entities/tour.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Status } from './types/status.type';

@Injectable()
export class reservationService {
  findReservationById: any;
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  // 예약 작성 메서드
  async create(
    CreateReservationDto: CreateReservationDto,
    userId: number,
    tourId: number,
  ): Promise<{ message: string; reservationDetails: Reservation }> {
    const { date, people, firstname, lastname, specialRequests } =
      CreateReservationDto;

    const newReservation = this.reservationRepository.create({
      date,
      people,
      firstname,
      lastname,
      specialRequests,
      userId,
      tourId,
    });

    console.log(newReservation);

    const createdReservation =
      await this.reservationRepository.save(newReservation);
    return {
      message: '예약이 성공적으로 완료되었습니다.',
      reservationDetails: createdReservation,
    };
  }

  async canCancelReservation(reservationId: number): Promise<boolean> {
    const reservation = await this.findReservationById(reservationId);
    const tourStartDate = reservation.date;

    const currentDate = new Date();

    const daysBeforeTourStart = 5;

    // 투어 시작 일자로부터 일정 일 수 이상 남아 있는지 확인.
    const differenceInTime = tourStartDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // 일정 일 수 이상 남아 있다면 취소 가능
    return differenceInDays > daysBeforeTourStart;
  }

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

    await this.reservationRepository.update(
      reservationId,
      UpdateReservationDto,
    );

    return {
      message: '해당 예약에 대한 취소 요청이 완료되었습니다.',
    };
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
    return await this.reservationRepository.find({ where: { status } });
  }
}
