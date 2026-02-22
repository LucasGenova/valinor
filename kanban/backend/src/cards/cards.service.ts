import { Injectable } from '@nestjs/common';
import { Card } from './cards.model';

@Injectable()
export class CardsService {
  private cards: Card[] = [];

  create(columnId: string, title: string, body?: string) {
    const card = {
      id: crypto.randomUUID(),
      columnId: columnId,
      title,
      body,
    };

    this.cards.push(card);
    return card;
  }

  findAll() {
    return this.cards;
  }

  findByColumn(columnId: string): Card[] {
    return this.cards.filter((card) => card.columnId === columnId);
  }

  delete(cardId: string) {
    this.cards = this.cards.filter((card) => card.id != cardId)
  }

  deleteByColumn(columnId: string){
    this.cards = this.cards.filter((card) => card.columnId != columnId)
  }
}
