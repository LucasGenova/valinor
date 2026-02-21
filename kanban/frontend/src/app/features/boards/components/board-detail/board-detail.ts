import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-detail.html',
  styleUrls: ['./board-detail.css']
})
export class BoardDetail{
  board$: Observable<Board | undefined>;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService
  ) {
    const boardId = this.route.snapshot.paramMap.get('id');
    
    this.board$ = this.boardsService.findAll().pipe(
      map(boards => boards.find(b => b.id === boardId))
    );
  }
}