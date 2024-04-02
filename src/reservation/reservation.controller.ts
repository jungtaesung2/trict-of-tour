import { NotFoundException } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { reservationService } from '../reservation/reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { TourService } from '../tour/tour.service';
import { validate } from 'class-validator';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Status } from './types/status.type';
//   import { BoardGuard } from 'src/board/guards/board.guard';
//   import { JwtAuthGuard } from 'src/user/guards/jwt.guard';

//   @UseGuards(JwtAuthGuard, BoardGuard)
@Controller('/reservations')
export class ReservationController {
  constructor(
    private readonly ReservationService: reservationService,
    private readonly TourService: TourService,
  ) {}

  @Post()
  async CreateReservation(
    @Param('tourId') tourId: number,
    @Body() CreateReservation: CreateReservationDto,
    @Req() req: any,
  ) {
    try {
      // 사용자 ID 가져오기
      const userId = req.user;

      await validate(CreateReservation);

      // 예약 생성
      const { message, reservationDetails } =
        await this.ReservationService.create(CreateReservation, userId, tourId);

      //   return {
      //     statusCode: 200,
      //     message,
      //     date: reservationDetails.date,
      //     people: reservationDetails.people,
      //     firstname: reservationDetails.firstname,
      //     lastname: reservationDetails.lastname,
      //     specialRequests: reservationDetails.specialRequests,
      //   };

      return { statusCode: 200, message, reservationDetails };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @Patch('/:reservationId')
  async editReservaition(
    @Param('reservationId') reservationId: number,
    @Body() UpdateReservationDto: UpdateReservationDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.user;

      // 예약 취소 가능 여부 확인
      const canCancel =
        await this.ReservationService.canCancelReservation(reservationId);

      // 예약 취소 요청을 서비스에 전달합니다.
      if (canCancel) {
        const cancellationResult =
          await this.ReservationService.requestCancellation(
            UpdateReservationDto,
            reservationId,
            userId,
          );

        return cancellationResult;
      } else {
        return { message: '해당 예약은 취소할 수 없습니다.' };
      }
    } catch (error) {
      return { message: `${error}` };
    }
  }

  // 예약 목록 전체 조회
  @Get()
  async findAllmyReservations(@Param('userId') userId: number) {
    return this.ReservationService.findAllmyReservations(userId);
  }

  // 예약 상세 조회
  @Get('/:reservationId')
  async findOne(@Param('reservationId') reservationId: number) {
    return this.ReservationService.findOne(reservationId);
  }

  // 예약 상태에 따라 조회
  @Get()
  async getReservationsByStatus(@Query('status') status: Status) {
    return this.ReservationService.findReservationsByStatus(status);
  }
}
