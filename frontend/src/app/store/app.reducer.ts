import { ActionReducerMap } from '@ngrx/store';

import * as fromLogin from '../components/app-login-wrapper/store/login.reducer';
import * as fromTodo from '../components/dashboard/todo/store/todo.reducer';
export interface AppState {
  login: fromLogin.LoginState;
  todos: fromTodo.TodoState;
}

export const appReducer: ActionReducerMap<AppState> = {
  todos: fromTodo.todoReducer,
  login: fromLogin.loginReducer,
};
