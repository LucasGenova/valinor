import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a board', () => {
    const board = service.create('My Board');

    expect(board).toHaveProperty('id');
    expect(board.name).toBe('My Board');
  });

  it('should store created boards', () => {
    service.create('Board 1');
    service.create('Board 2');

    const boards = service.findAll();
    expect(boards.length).toBe(2);
  });

  it('should return an empty array initially', () => {
    expect(service.findAll()).toEqual([]);
  });
});
