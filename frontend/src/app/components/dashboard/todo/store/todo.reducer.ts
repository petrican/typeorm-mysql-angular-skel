import { Action, createReducer, on, State } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { TodoDataItem } from './todo.types';

export const todoFeatureKey = 'todo';

export interface TodoState {
  error: null;
  loading: boolean;
  items: Array<TodoDataItem>;
}

export const initialState: TodoState = {
  error: null,
  loading: false,
  items: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.create, (state, payloadData) => ({
    ...state,
    items: { ...state.items, payloadData },
  })),
  on(TodoActions.readAll, (state) => ({ ...state, loading: true })),
  on(TodoActions.readAllSuccess, (state, payload) => ({
    ...state,
    items: payload.todos,
    loading: false,
  }))
);

export function reducer(state: TodoState, action: Action) {
  return todoReducer(state, action);
}