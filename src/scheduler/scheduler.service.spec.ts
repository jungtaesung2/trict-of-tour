import { Test, TestingModule } from '@nestjs/testing';
import { ReservationSchedulerService } from './scheduler.service';

describe('SchedulerService', () => {
  let service: ReservationSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationSchedulerService],
    }).compile();

    service = module.get<ReservationSchedulerService>(
      ReservationSchedulerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
