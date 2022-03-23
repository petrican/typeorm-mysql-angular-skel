import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  update(todo: TodoDataItem): Observable<TodoDataItem> {
    return this.http.put<TodoDataItem>(
      `http://localhost:3000/todos/${todo.id}`,
      todo
    );
  }

  remove(id: number): Observable<number> {
    return this.http
      .delete<void>(`http://localhost:3000/todos/${id}`)
      .pipe(map(() => id));
  }
}
