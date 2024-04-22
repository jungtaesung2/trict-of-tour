'use strict';

class ReservationGateWay {
  constructor(reservationService) {
    this.reservationService = reservationService;
  }

  async handleCreateReservation(client, data) {
    try {
      const userId = 1;
      const tourId = 1;
      const { message, reservation } = await this.reservationService.create(
        data,
        userId,
        tourId,
      );
      const reservationId = reservation.id;
      const reservationUrl = `localhost:3312/reservations/${reservationId}`;
      this.server.to(client.id).emit('reservationCreated', {
        message: message,
        reservation: reservation,
        reservationUrl: reservationUrl,
      });
      this.server
        .to(client.id)
        .emit(
          'notification',
          `예약이 완료되었습니다. 예약 확인을 원하시면 ${reservationUrl}을(를) 방문하세요.`,
        );
    } catch (error) {
      this.server.to(client.id).emit('reservationFailed');
    }
  }

  async handleCancelReservation(client, reservationId) {
    try {
      const cancelledReservation =
        await this.reservationService.findReservationById(reservationId);
      const cancellationDate = cancelledReservation.cancelledAt
        .toISOString()
        .split('T')[0];
      this.server.to(client.id).emit('reservationCancelled', {
        id: reservationId,
        cancellationDate: cancellationDate,
      });
    } catch (error) {
      console.error('예약 취소 중 오류가 발생했습니다:', error);
    }
  }
}

window.ReservationGateWay = ReservationGateWay;
