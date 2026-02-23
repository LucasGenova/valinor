import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board.model';
import { Column } from '../../../columns/models/column.model';
import { ColumnService } from '../../../columns/services/column';
import { Card } from '../../../cards/models/card.model';
import { CardService } from '../../../cards/services/cards';
import { ColumnComponent } from '../../../columns/components/column/column';
import { AddCardModalComponent } from '../../../../shared/components/add-card-modal/add-card-modal';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [CommonModule, ColumnComponent, AddCardModalComponent],
  templateUrl: './board-detail.html',
  styleUrls: ['./board-detail.css']
})
export class BoardDetail {
  board$: Observable<Board | undefined>;
  private columnsSubject = new BehaviorSubject<Column[]>([]);
  columns$ = this.columnsSubject.asObservable();
  cardsMap = new Map<string, BehaviorSubject<Card[]>>();

  showAddCardModal = false;
  selectedColumnId: string | null = null;
  selectedColumnName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  openAddCardModal(columnId: string) {
    const currentColumns = this.columnsSubject.value;
    const column = currentColumns.find(c => c.id === columnId);
    this.selectedColumnName = column ? column.name : '';

    this.selectedColumnId = columnId;
    this.showAddCardModal = true;
  }


  onSaveCard(cardData: { title: string; body: string }) {
    if (this.selectedColumnId) {
      this.cardService.create({
        columnId: this.selectedColumnId,
        title: cardData.title,
        body: cardData.body
      }).subscribe(() => {
        this.loadCardsForColumn(this.selectedColumnId!);
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.showAddCardModal = false;
    this.selectedColumnId = null;
  }

  goBack(): void {
    this.router.navigate(['/boards']);
  }

  onDeleteCard(cardId: string) {
    this.cardService.delete(cardId).subscribe({
      next: () => {
        for (let [_, subject] of this.cardsMap.entries()) {
          const currentCards = subject.value;
          const updatedCards = currentCards.filter(c => c.id !== cardId);
          if (updatedCards.length !== currentCards.length) {
            subject.next(updatedCards);
            break;
          }
        }
      }
    });
  }

  onDeleteColumn(columnId: string) {
    this.columnService.delete(columnId).subscribe({
      next: () => {

        const currentColumns = this.columnsSubject.value;
        const updatedColumns = currentColumns.filter(c => c.id !== columnId);
        this.columnsSubject.next(updatedColumns);
      }
    });
  }
}

