import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from '../models/board.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private apiUrl = 'http://localhost:3000/boards';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrl);
  }

  create(name: string): Observable<Board> {
    return this.http.post<Board>(this.apiUrl, { name });
  }
}
