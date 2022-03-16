import { Action, createReducer, on, State } from '@ngrx/store';
import * as LoginActions from './login.actions';

export const loginFeatureKey = 'login';

export interface LoginState {
  hasErrors: boolean;
  isAuthenticated: boolean;
}

export const initialState: LoginState = {
  hasErrors: false,
  isAuthenticated: false,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginToServer, () => ({ ...initialState, hasErrors: true })),
  on(LoginActions.authSuccess, (state, payloadData) => {
    const { auth, username, user_full_name, user_email } = payloadData.payload;
    return {
      ...state,
      hasErrors: false,
      isAuthenticated: auth,
      username,
      user_full_name,
      user_email,
    };
  }),
  on(LoginActions.logoutFromServer, () => ({ ...initialState }))
);

/**
 * Declaring a reducer creator using a wrapper function (Only needed if using View Engine AOT)
 */
export function reducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
