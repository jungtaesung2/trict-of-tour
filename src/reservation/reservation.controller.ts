import { BadRequestException, NotFoundException } from '@nestjs/common';
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
import { ReservationService } from '../reservation/reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { TourService } from '../tour/tour.service';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { Status } from './types/status.type';
import { UserInfo } from 'src/utils/userinfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('/reservations')
export class ReservationController {
  constructor(
    private readonly ReservationService: ReservationService,
    private readonly TourService: TourService,
  ) {}

  @Post('/:tourId')
  async CreateReservation(
    @Param('tourId') tourId: number,
    @Body() CreateReservationDto: CreateReservationDto,
    @UserInfo() user: User,
  ) {
    // 사용자 ID 가져오기
    const userId = user.id;
    console.log('유저아이디', userId);

    // 주어진 투어 ID에 해당하는 투어가 있는지 확인
    const tour = await this.TourService.findOne(+tourId);
    console.log('투어정보', tour);
    if (!tour) {
      throw new NotFoundException('해당하는 투어를 찾지 못하였습니다.');
    }

    const isValidDate = await this.ReservationService.isDateValid(
      tourId,
      new Date(CreateReservationDto.date),
    );
    if (!isValidDate) {
      throw new BadRequestException('예약할 수 없는 날짜입니다.');
    }
    // 예약 생성
    const { message, reservation } = await this.ReservationService.create(
      CreateReservationDto,
      userId,
      tourId,
    );

    return { statusCode: 200, message, reservation };
  }

  @Patch('/:reservationId/cancel')
  async editReservaition(
    @Param('reservationId') reservationId: number,
    @Body() cancelReservationDto: CancelReservationDto,
    @UserInfo() user: User,
  ) {
    try {
      const userId = user.id;

      const canCancel =
        await this.ReservationService.canCancelReservation(reservationId);

      // 예약 취소 요청을 서비스에 전달합니다.
      if (canCancel) {
        const cancellationResult =
          await this.ReservationService.requestCancellation(
            reservationId,
            cancelReservationDto,
            userId,
          );

        return cancellationResult;
      } else {
        return { statusCode: 200, message: '해당 예약은 취소할 수 없습니다.' };
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

  // 예약 상태에 따라 조회
  @Get('/status')
  async getReservationsByStatus(@Query('status') status: Status) {
    return this.ReservationService.findReservationsByStatus(status);
  }

  // 예약 상세 조회
  @Get('/:reservationId')
  async findOne(@Param('reservationId') reservationId: number) {
    return this.ReservationService.findReservationById(reservationId);
  }
}
