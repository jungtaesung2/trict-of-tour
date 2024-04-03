import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../reservation/reservation.controller';
import { reservationService } from '../reservation/reservation.service';

describe('ReservationsController', () => {
  let controller: ReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [reservationService],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
