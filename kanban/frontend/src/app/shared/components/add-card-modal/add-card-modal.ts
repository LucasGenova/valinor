import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-card-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-card-modal.html',
  styleUrls: ['./add-card-modal.css']
})
export class AddCardModalComponent {
  @Input() columnName!: string;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ title: string; body: string }>();

  title = '';
  body = '';

  onSave() {
    if (this.title.trim()) {
      this.save.emit({ title: this.title, body: this.body });
      this.title = '';
      this.body = '';
    }
  }

  onClose() {
    this.close.emit();
  }
}