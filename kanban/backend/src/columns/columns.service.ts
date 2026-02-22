import { Injectable } from '@nestjs/common';
import { Column } from './column.model';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class ColumnsService {
  private columns: Column[] = [];

  constructor(private cardService: CardsService) {}

  create(boardId: string, name: string) {
    const column = {
      id: crypto.randomUUID(),
      boardId,
      name,
    };

    this.columns.push(column);
    return column;
  }

  findAll() {
    return this.columns;
  }

  findByBoard(boardId: string): Column[] {
    return this.columns.filter((card) => card.boardId === boardId);
  }

  delete(columnId: string) {
    this.cardService.deleteByColumn(columnId);
    this.columns = this.columns.filter((column) => column.id != columnId);
  }

  deleteByBoard(boardId: string){
    this.columns = this.columns.filter((column) => column.boardId != boardId)
  }
}
