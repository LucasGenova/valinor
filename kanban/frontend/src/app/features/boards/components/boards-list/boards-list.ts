import { Component } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './boards-list.html',
  styleUrls: ['./boards-list.css'],
})
export class BoardsList {
  boards$: Observable<Board[]>;

  constructor(private boardsService: BoardsService) {
    this.boards$ = this.boardsService.findAll();
  }

  addBoard(name: string) {
    if (!name) return;
    this.boardsService.create(name).subscribe();
  }
}