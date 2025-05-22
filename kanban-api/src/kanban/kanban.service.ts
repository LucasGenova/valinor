import { Injectable } from '@nestjs/common';
import { Card, Column, KanbanStorage } from './kanban.storage';

@Injectable()
export class KanbanService {
  private readonly storage = new KanbanStorage();

  createColumn(title: string): Column {
    return this.storage.createColumn(title);
  }

  getColumn(columnId: string): Column {
    return this.storage.getColumn(columnId);
  }

  createCard(
    columnId: string,
    title: string,
    description: string | undefined,
  ): Card {
    return this.storage.createCard(columnId, title, description);
  }

  getCard(columnId: string, cardId: string): Card {
    return this.storage.getCard(columnId, cardId);
  }

  getAllColumns(): Column[] {
    return this.storage.getAllColumns();
  }
}
