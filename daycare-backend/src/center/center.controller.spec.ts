import { Test, TestingModule } from '@nestjs/testing';
import { CenterController } from './center.controller';
import { CenterService } from './center.service';

describe('CenterController', () => {
  let controller: CenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CenterController],
      providers: [CenterService],
    }).compile();

    controller = module.get<CenterController>(CenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
