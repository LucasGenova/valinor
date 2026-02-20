import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boards.html',
  styleUrls: ['./boards.css'],
})
export class Boards implements OnInit {
  boards: Board[] = [];

  constructor(private boardsService: BoardsService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadBoards();
  }

  loadBoards() {
    this.boardsService.findAll().subscribe((data) => {
      this.boards = data;
      this.cdr.detectChanges();
    });

  }

  addBoard(name: string) {
    if (!name) return;
    this.boardsService.create(name).subscribe((board) => {
      this.boards = [...this.boards, board];
      this.cdr.detectChanges();
    });
  }
}
