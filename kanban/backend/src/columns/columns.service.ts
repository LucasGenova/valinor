import { Injectable } from '@nestjs/common';
import { Column } from './column.model';

@Injectable()
export class ColumnsService {
    private columns: Column[] = [];

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
        return this.columns.filter(card => card.boardId === boardId);
    }
}
