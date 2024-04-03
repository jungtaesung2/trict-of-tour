import { Test, TestingModule } from '@nestjs/testing';
import { reservationService } from '../reservation/reservation.service';

describe('ReservationsService', () => {
  let service: reservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [reservationService],
    }).compile();

    service = module.get<reservationService>(reservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
