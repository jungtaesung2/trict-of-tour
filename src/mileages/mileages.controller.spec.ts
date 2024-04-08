import { Test, TestingModule } from '@nestjs/testing';
import { MileagesController } from './mileages.controller';

describe('MileagesController', () => {
  let controller: MileagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MileagesController],
    }).compile();

    controller = module.get<MileagesController>(MileagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
