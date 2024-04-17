import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateReservationDto } from 'src/reservation/dto/create-reservation.dto';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { ReservationService } from 'src/reservation/reservation.service';

@WebSocketGateway(3318, { namespace: 'notification' }) // 안에 port와 namespace를 속성으로 넣어줄 수 있다.
export class ReservationGateWay {
  @WebSocketServer()
  server: Server;
  constructor(private readonly reservationService: ReservationService) {}

  @SubscribeMessage('reservationCreated')
  async handleCreateReservation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateReservationDto,
  ) {
    const userId = 1; // 예약을 생성하는 데 필요한 사용자 ID, 실제 사용자 ID를 여기에 할당해야 함
    const tourId = 1; // 예약을 생성하는 데 필요한 투어 ID, 실제 투어 ID를 여기에 할당해야 함

    try {
      const { message, reservation } = await this.reservationService.create(
        data,
        userId,
        tourId,
      );
      const reservationId = reservation.id;
      const reservationUrl = `localhost:3312/reservations/${reservationId}`;
      this.server.to(client.id).emit('reservationCreated', {
        message,
        reservation,
        reservationUrl,
      });
      this.server
        .to(client.id)
        .emit(
          'notification',
          `예약이 완료되었습니다. 예약 내역을 확인하려면 ${reservationUrl}을(를) 방문하세요.`,
        );
    } catch (error) {
      this.server.to(client.id).emit('reservationFailed');
    }
  }

  @SubscribeMessage('cancelReservation')
  async handleCancelReservation(
    @ConnectedSocket() client: Socket,
    reservationId: number,
  ) {
    try {
      const cancelledReservation: Reservation =
        await this.reservationService.findReservationById(reservationId);
      const cancellationDate: string = cancelledReservation.cancelledAt
        .toISOString()
        .split('T')[0];
      this.server.to(client.id).emit('reservationCancelled', {
        id: reservationId,
        cancellationDate,
      });
    } catch (error) {
      console.error('Error occurred during reservation cancellation:', error);
    }
  }
}
