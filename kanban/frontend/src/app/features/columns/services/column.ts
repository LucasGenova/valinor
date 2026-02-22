import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Column } from '../models/column.model';

@Injectable({ providedIn: 'root' })
export class ColumnService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getColumnsByBoard(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiUrl}/boards/${boardId}/columns`);
  }

  create(column: { boardId: string; name: string}): Observable<Column> {
  return this.http.post<Column>(`${this.apiUrl}/columns`, column);
}
}