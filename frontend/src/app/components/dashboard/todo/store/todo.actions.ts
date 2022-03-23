import { createAction, props } from '@ngrx/store';
import { TodoAddItem, TodoDataItem } from './todo.types';
import {
  TODO_CREATE,
  TODO_CREATE_SUCCESS,
  TODO_CREATE_FAILURE,
  TODO_READALL,
  TODO_READALL_SUCCESS,
  TODO_READALL_FAILURE,
} from './todo.constants';

/** CREATE */
export const create = createAction(TODO_CREATE, props<{ todo: TodoAddItem }>());
export const createSuccess = createAction(
  TODO_CREATE_SUCCESS,
  props<{ todo: TodoDataItem }>()
);
export const createFailure = createAction(
  TODO_CREATE_FAILURE,
  props<{ error: unknown }>()
);

/** READ */
export const readAll = createAction(
  TODO_READALL,
  props<{ loading: boolean }>()
);
export const readAllSuccess = createAction(
  TODO_READALL_SUCCESS,
  props<{ todos: TodoDataItem[] }>()
);
export const readAllFailure = createAction(
  TODO_READALL_FAILURE,
  props<{ error: unknown }>()
);
