import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board.model';
import { Column } from '../../../columns/models/column.model';
import { ColumnService } from '../../../columns/services/column';
import { Card } from '../../../cards/models/card.model';
import { CardService } from '../../../cards/services/cards';
import { ColumnComponent } from '../../../columns/components/column/column';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [CommonModule, ColumnComponent],
  templateUrl: './board-detail.html',
  styleUrls: ['./board-detail.css']
})
export class BoardDetail {
  board$: Observable<Board | undefined>;
  private columnsSubject = new BehaviorSubject<Column[]>([]);
  columns$ = this.columnsSubject.asObservable();
  cardsMap = new Map<string, BehaviorSubject<Card[]>>();

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private columnService: ColumnService,
    private cardService: CardService
  ) {
    const boardId = this.route.snapshot.paramMap.get('id')!;

    this.board$ = this.boardsService.findAll().pipe(
      map(boards => boards.find(b => b.id === boardId))
    );

    this.loadColumns(boardId);
  }

  loadColumns(boardId: string): void {
    this.columnService.getColumnsByBoard(boardId).subscribe(columns => {
      columns.forEach(column => {
        if (!this.cardsMap.has(column.id)) {
          this.cardsMap.set(column.id, new BehaviorSubject<Card[]>([]));
        }
      });

      this.columnsSubject.next(columns);

      columns.forEach(column => this.loadCardsForColumn(column.id));
    });
  }

  addColumn(name: string): void {
    const boardId = this.route.snapshot.paramMap.get('id')!;
    if (!name) return;

    this.columnService.create({ boardId, name }).subscribe(() => {
      this.loadColumns(boardId);
    });
  }

  loadCardsForColumn(columnId: string): void {
    this.cardService.getCardsByColumn(columnId).subscribe(cards => {
      if (!this.cardsMap.has(columnId)) {
        this.cardsMap.set(columnId, new BehaviorSubject<Card[]>(cards));
      } else {
        this.cardsMap.get(columnId)!.next(cards);
      }
    });
  }

  addCard(columnId: string): void {
    const title = prompt('Enter card title:');
    if (!title) return;
    this.cardService.create({ columnId, title }).subscribe(() => {
      this.loadCardsForColumn(columnId);
    });
  }
}