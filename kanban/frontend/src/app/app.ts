import { Component } from '@angular/core';
import { BoardsList } from './features/boards/components/boards-list/boards-list';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoardsList],
  template: `<app-boards></app-boards>`, 
})
export class App {}
