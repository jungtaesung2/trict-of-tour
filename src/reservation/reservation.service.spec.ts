import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../reservation/reservation.service';

describe('ReservationsService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
