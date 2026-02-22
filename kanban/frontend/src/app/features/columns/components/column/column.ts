import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from '../../models/column.model';
import { Card } from '../../../cards/models/card.model';
import { CardComponent } from '../../../cards/components/card/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './column.html',
  styleUrls: ['./column.css']
})
export class ColumnComponent {
  @Input() column!: Column;
  @Input() cards$!: Observable<Card[]>;
  @Output() addCard = new EventEmitter<string>();

  onAddCard(): void {
    this.addCard.emit(this.column.id);
  }
}