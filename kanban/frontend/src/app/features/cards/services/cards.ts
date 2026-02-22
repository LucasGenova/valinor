import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCardsByColumn(columnId: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/columns/${columnId}/cards`);
  }

  create(card: { columnId: string; title: string, body?: string }): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/cards`, card);
  }
}