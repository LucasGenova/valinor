import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsService],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a card', () => {
    const card = service.create('col-1', 'My Card', 'Optional body');

    expect(card).toHaveProperty('id');
    expect(card.columnId).toBe('col-1');
    expect(card.title).toBe('My Card');
    expect(card.body).toBe('Optional body');
  });

  it('should store created cards', () => {
    service.create('col-1', 'Card 1');
    service.create('col-2', 'Card 2', 'With body');

    const cards = service.findAll();
    expect(cards.length).toBe(2);
  });

  it('should return an empty array initially', () => {
    expect(service.findAll()).toEqual([]);
  });

  describe('findByColumn', () => {
    it('should return cards that belong to the specified column', () => {
      const card1 = service.create('col-1', 'Card 1');
      const card2 = service.create('col-1', 'Card 2');
      const card3 = service.create('col-2', 'Card 3');

      const result = service.findByColumn('col-1');

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(card1);
      expect(result).toContainEqual(card2);
      expect(result).not.toContainEqual(card3);
    });

    it('should return an empty array if column has no cards', () => {
      service.create('col-1', 'Some card');
      const result = service.findByColumn('non-existent');
      expect(result).toEqual([]);
    });
  });
});
