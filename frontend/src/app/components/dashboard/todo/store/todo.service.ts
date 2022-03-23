import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoAddItem, TodoDataItem } from './todo.types';

/**
 * Service
 */
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  /**
   * Create
   *
   * @param todo Todo
   */
  create(todo: TodoAddItem): Observable<TodoDataItem> {
    return this.http.post<TodoDataItem>(`http://localhost:3000/todos`, {
      action: todo,
    });
  }

  findAll(): Observable<TodoDataItem[]> {
    return this.http.get<TodoDataItem[]>(`http://localhost:3000/todos`, {});
  }
}
