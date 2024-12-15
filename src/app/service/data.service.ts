// src/app/service/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/boards`);
  }

  getBoard(boardId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/boards/${boardId}`);
  }

  createBoard(board: { name: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/boards`, board);
  }

  deleteBoard(boardId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/boards/${boardId}`);
  }

  getLists(boardId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/boards/${boardId}/lists`);
  }

  createList(boardId: number, list: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/boards/${boardId}/lists`, list);
  }

  deleteList(boardId: number, listId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/boards/${boardId}/lists/${listId}`);
  }

  getCardsForList(boardId: number, listId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/boards/${boardId}/lists/${listId}/cards`);
  }

  createCard(boardId: number, listId: number, card: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/boards/${boardId}/lists/${listId}/cards`, card);
  }

  deleteCard(boardId: number, listId: number, cardId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/boards/${boardId}/lists/${listId}/cards/${cardId}`);
  }

  updateCard(boardId: number, listId: number, cardId: number, updatedCard: { description: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/boards/${boardId}/lists/${listId}/cards/${cardId}`, updatedCard);
  }


}
