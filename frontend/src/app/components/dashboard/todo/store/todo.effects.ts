import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, concatMap, switchMap, catchError } from 'rxjs/operators';
import { TodoService } from './todo.service';
import * as TodoActions from './todo.actions';
import * as fromApp from '../../../../store/app.reducer';

/**
 * Todo effects
 */
@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.create),
      concatMap(({ todo }) =>
        this.todoService.create(todo).pipe(
          map((result) => {
            return TodoActions.createSuccess({ todo: result });
          }),
          catchError((error) => of(TodoActions.createFailure({ error })))
        )
      )
    )
  );

  readAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.readAll),
      switchMap(() =>
        this.todoService.findAll().pipe(
          map((result) => {
            return TodoActions.readAllSuccess({ todos: result });
          }),
          catchError((error) => of(TodoActions.readAllFailure({ error })))
        )
      )
    )
  );
}