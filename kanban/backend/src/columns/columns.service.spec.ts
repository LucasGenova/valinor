import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsService } from './columns.service';
import { CardsService } from '../cards/cards.service';

describe('ColumnsService', () => {
  let service: ColumnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumnsService, CardsService],
    }).compile();

    service = module.get<ColumnsService>(ColumnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a column', () => {
    const column = service.create('brd-1', 'My Column');

    expect(column).toHaveProperty('id');
    expect(column.boardId).toBe('brd-1');
    expect(column.name).toBe('My Column');
  });

  it('should store created columns', () => {
    service.create('col-1', 'Column 1');
    service.create('col-2', 'Column 2');

    const columns = service.findAll();
    expect(columns.length).toBe(2);
  });

  it('should return an empty array initially', () => {
    expect(service.findAll()).toEqual([]);
  });

  describe('findByBoard', () => {
    it('should return columns that belong to the specified board', () => {
      const col1 = service.create('board-1', 'Column 1');
      const col2 = service.create('board-1', 'Column 2');
      const col3 = service.create('board-2', 'Column 3');

      const result = service.findByBoard('board-1');

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(col1);
      expect(result).toContainEqual(col2);
      expect(result).not.toContainEqual(col3);
    });

    it('should return an empty array if board has no columns', () => {
      service.create('board-1', 'Some column');
      const result = service.findByBoard('non-existent');
      expect(result).toEqual([]);
    });
  });

  describe('delete', () => {
    it('should remove a column by id', () => {
      const column = service.create('board-1', 'My Column');
      service.delete(column.id);
      expect(service.findAll()).toHaveLength(0);
    });

    it('should only remove the specified column', () => {
      const col1 = service.create('board-1', 'Column 1');
      const col2 = service.create('board-1', 'Column 2');

      service.delete(col1.id);

      const columns = service.findAll();
      expect(columns).toHaveLength(1);
      expect(columns[0].id).toBe(col2.id);
    });
  });

  describe('deleteByBoard', () => {
    it('should remove all columns in a board', () => {
      service.create('board-1', 'Column 1');
      service.create('board-1', 'Column 2');
      service.create('board-2', 'Column 3');

      service.deleteByBoard('board-1');

      const columns = service.findAll();
      expect(columns).toHaveLength(1);
      expect(columns[0].boardId).toBe('board-2');
    });

    it('should do nothing if board has no columns', () => {
      const column = service.create('board-1', 'My Column');

      service.deleteByBoard('non-existent');

      expect(service.findAll()).toHaveLength(1);
      expect(service.findAll()[0].id).toBe(column.id);
    });
  });
});
