import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class CardComponent {
  @Input() card!: Card;
  @Output() delete = new EventEmitter<string>()
  
  onDelete() {
      this.delete.emit(this.card.id);
  }
}

  