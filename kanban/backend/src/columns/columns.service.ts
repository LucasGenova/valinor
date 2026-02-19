import { Injectable } from '@nestjs/common';
import { Column } from './column.model';

@Injectable()
export class ColumnsService {
    private columns: Column[] = [];
    
      create(board_id: string, name: string) {
        const column = {
          id: crypto.randomUUID(),
          board_id,
          name,
        };
    
        this.columns.push(column);
        return column;
      }
    
      findAll() {
        return this.columns;
      }
}
