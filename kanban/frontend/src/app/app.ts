import { Component } from '@angular/core';
import { Boards } from './boards/boards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Boards],
  template: `<app-boards></app-boards>`, 
})
export class App {}
