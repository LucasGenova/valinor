import { Injectable } from '@nestjs/common';
import { Board } from './boards.model';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  constructor(private columnService: ColumnsService) {}

  create(name: string) {
    const board = {
      id: crypto.randomUUID(),
      name,
    };

    this.boards.push(board);
    return board;
  }

  findAll() {
    return this.boards;
  }

  delete(boardId: string) {
    this.columnService.deleteByBoard(boardId);
    this.boards = this.boards.filter((board) => board.id != boardId);
  }
}
