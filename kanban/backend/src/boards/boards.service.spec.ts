import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { ColumnsService } from '../columns/columns.service';
import { CardsService } from '../cards/cards.service';

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService, ColumnsService, CardsService],
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

  describe('delete', () => {
    it('should remove a board by id', () => {
      const board = service.create('My Board');
      service.delete(board.id);
      expect(service.findAll()).toHaveLength(0);
    });

    it('should only remove the specified board', () => {
      const board1 = service.create('Board 1');
      const board2 = service.create('Board 2');

      service.delete(board1.id);

      const boards = service.findAll();
      expect(boards).toHaveLength(1);
      expect(boards[0].id).toBe(board2.id);
    });
  });
});
