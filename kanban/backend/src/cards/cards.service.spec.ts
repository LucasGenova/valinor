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

  describe('delete', () => {
    it('should remove a card by id', () => {
      const card = service.create('col-1', 'My Card');
      service.delete(card.id);
      expect(service.findAll()).toHaveLength(0);
    });

    it('should only remove the specified card', () => {
      const card1 = service.create('col-1', 'Card 1');
      const card2 = service.create('col-1', 'Card 2');

      service.delete(card1.id);

      const cards = service.findAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].id).toBe(card2.id);
    });
  });

  describe('deleteByColumn', () => {
    it('should remove all cards in a column', () => {
      service.create('col-1', 'Card 1');
      service.create('col-1', 'Card 2');
      service.create('col-2', 'Card 3');

      service.deleteByColumn('col-1');

      const cards = service.findAll();
      expect(cards).toHaveLength(1);
      expect(cards[0].columnId).toBe('col-2');
    });

    it('should do nothing if column has no cards', () => {
      const card = service.create('col-1', 'My Card');

      service.deleteByColumn('non-existent');

      expect(service.findAll()).toHaveLength(1);
      expect(service.findAll()[0].id).toBe(card.id);
    });
  });
});
