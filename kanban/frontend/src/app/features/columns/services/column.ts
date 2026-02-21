import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Column } from '../models/column.model';

@Injectable({ providedIn: 'root' })
export class ColumnService {
  private apiUrl = 'http://localhost:3000/columns';

  constructor(private http: HttpClient) {}

  getColumnsByBoard(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiUrl}/boards/${boardId}`);
  }
}