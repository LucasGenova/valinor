import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { CardsService } from '../cards/cards.service';

describe('ColumnsController', () => {
  let controller: ColumnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColumnsController],
      providers: [ColumnsService, CardsService]
    }).compile();

    controller = module.get<ColumnsController>(ColumnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
