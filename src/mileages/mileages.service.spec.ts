import { Test, TestingModule } from '@nestjs/testing';
import { MileagesService } from './mileages.service';

describe('MileagesService', () => {
  let service: MileagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MileagesService],
    }).compile();

    service = module.get<MileagesService>(MileagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
