import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Board } from '../models/board.model';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private apiUrl = 'http://localhost:3000/boards';
  private boardsSubject = new BehaviorSubject<Board[]>([]);
  boards$ = this.boardsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadBoards();
  }

  private loadBoards(): void {
    this.http.get<Board[]>(this.apiUrl).subscribe(boards => {
      this.boardsSubject.next(boards);
    });
  }

  findAll(): Observable<Board[]> {
    return this.boards$;
  }

  create(name: string): Observable<Board> {
    return this.http.post<Board>(this.apiUrl, { name }).pipe(
      tap(newBoard => {
        const current = this.boardsSubject.getValue();
        this.boardsSubject.next([...current, newBoard]);
      })
    );
  }

  delete(boardId: string ) {
    return this.http.delete(`${this.apiUrl}/${boardId}`).pipe(
      tap(() => this.loadBoards())
    );
  }
}