import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsService } from './columns.service';

describe('ColumnsService', () => {
  let service: ColumnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumnsService],
    }).compile();

    service = module.get<ColumnsService>(ColumnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a column', () => {
    const column = service.create('brd-1', 'My Column');

    expect(column).toHaveProperty('id');
    expect(column.board_id).toBe('brd-1');
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
});
