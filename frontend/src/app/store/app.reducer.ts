import { ActionReducerMap } from '@ngrx/store';

import * as fromLogin from '../components/app-login-wrapper/store/login.reducer';

export interface AppState {
  login: fromLogin.LoginState;
}

export const appReducer: ActionReducerMap<AppState> = {
  login: fromLogin.loginReducer,
};
