import { NotFoundException } from "@nestjs/common";

export interface Card {
  id: string;
  title: string;
  description?: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export class KanbanStorage {
  private columns: Column[] = [];
  private currentId: number = 0;

  private getNextId(): number {
    return this.currentId++;
  }

  createColumn(title: string): Column {
    const column: Column = {
      id: 'col-' + this.getNextId(),
      title: title,
      cards: [],
    };
    this.columns.push(column);

    return column;
  }

  getColumn(columnId: string): Column {
    const filteredColumns = this.columns.filter((column) => column.id == columnId);

    if(filteredColumns.length == 0) {
      throw new NotFoundException('Column not Found.');
    }

    return filteredColumns[0];
  }

  createCard(
    columnId: string,
    title: string,
    description: string | undefined,
  ): Card  {

    const filteredColumns = this.columns.filter((column) => column.id == columnId);

    if(filteredColumns.length == 0) {
      throw new NotFoundException('Column not Found.');
    }

    const column = filteredColumns[0];
   
    const card: Card = {
      id: 'card-' + this.getNextId(),
      title: title,
      description: description,
    };

    column.cards.push(card);

    return card;
  }

  getCard(columnId: string, cardId: string): Card {
    const filteredColumns = this.columns.filter((column) => column.id == columnId)

    if(filteredColumns.length == 0) {
      throw new NotFoundException('Column not Found.');
    }

    const filteredCards = filteredColumns[0].cards.filter((card) => card.id == cardId);

    if(filteredColumns.length == 0) {
      throw new NotFoundException('Card not Found.');
    }
    
    return filteredCards[0]   
  }

  getAllColumns(): Column[] {
    return this.columns;
  }
}
