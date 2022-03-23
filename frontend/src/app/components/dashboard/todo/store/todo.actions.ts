import { createAction, props } from '@ngrx/store';
import { TodoAddItem, TodoDataItem } from './todo.types';
import {
  TODO_CREATE,
  TODO_CREATE_SUCCESS,
  TODO_CREATE_FAILURE,
  TODO_READALL,
  TODO_READALL_SUCCESS,
  TODO_READALL_FAILURE,
  TODO_DELETE,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAILURE,
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

/** DELETE */
export const remove = createAction(TODO_DELETE, props<{ id: number }>());

export const removeSuccess = createAction(
  TODO_DELETE_SUCCESS,
  props<{ id: number }>()
);

export const removeFailure = createAction(
  TODO_DELETE_FAILURE,
  props<{ error: unknown }>()
);
