import { Action, createReducer, on, State } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { TodoDataItem } from './todo.types';

export const todoFeatureKey = 'todo';

export interface TodoState {
  error: null;
  loading: boolean;
  items: Array<TodoDataItem>;
  isEdited?: boolean;
  editedItem?: TodoDataItem;
}

export const initialState: TodoState = {
  error: null,
  loading: false,
  items: [],
  isEdited: false,
};

export const todoReducer = createReducer(
  initialState,
  // CREATE
  on(TodoActions.create, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoActions.createSuccess, (state, payload) => {
    return {
      ...state,
      items: [...state.items, payload.todo],
    };
  }),
  // READ
  on(TodoActions.readAll, (state) => ({ ...state, loading: true })),
  on(TodoActions.readAllSuccess, (state, payload) => ({
    ...state,
    items: payload.todos,
    loading: false,
  })),
  on(TodoActions.removeSuccess, (state, payload) => {
    const newTodos = [...state.items];
    return {
      ...state,
      items: newTodos.filter((todoItem) => todoItem.id !== payload.id),
    };
  }),
  // EDIT
  on(TodoActions.initEdit, (state, payload) => ({
    ...state,
    isEdited: true,
    editedItem: payload.todoItem,
  })),
  on(TodoActions.cancelEdit, (state, payload) => ({
    ...state,
    isEdited: payload.isEdited,
  })),
  on(TodoActions.updateSuccess, (state, payload) => {
    const newTodos = [...state.items];
    const resultedTodos = newTodos.map((todoItem) => {
      if (todoItem.id == payload.todoItem.id) {
        return { id: todoItem.id, action: payload.todoItem.action };
      }
      return todoItem;
    });

    return {
      ...state,
      isEdited: false,
      items: resultedTodos,
    };
  })
);

export function reducer(state: TodoState, action: Action) {
  return todoReducer(state, action);
}
