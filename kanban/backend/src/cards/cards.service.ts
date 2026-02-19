import { Injectable } from '@nestjs/common';
import { Card } from './cards.model';

@Injectable()
export class CardsService {
    private cards: Card[] = []

    create(column_id: string, title: string, body?: string) {
    const card = {
      id: crypto.randomUUID(),
      column_id,
      title,
      body
    };

    this.cards.push(card);
    return card;
  }

  findAll() {
    return this.cards;
  }
}
