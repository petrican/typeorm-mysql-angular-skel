import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState, todoFeatureKey } from './todo.reducer';

const getTodoState = createFeatureSelector<TodoState>(todoFeatureKey);

export const getTodoBranch = createSelector(getTodoState, (state) => {
  return state;
});
