import { Injectable } from '@nestjs/common';

export interface Board {
  id: string;
  name: string;
}

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

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
}
