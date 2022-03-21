import { Action, createReducer, on, State } from '@ngrx/store';
import * as LoginActions from './login.actions';

export const loginFeatureKey = 'login';

export interface LoginState {
  [x: string]: any;
  hasErrors: boolean;
  isAuthenticated: boolean;
}

export const initialState: LoginState = {
  hasErrors: false,
  isAuthenticated: false,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginToServer, () => ({ ...initialState, hasErrors: false })),
  on(LoginActions.authSuccess, (state, payloadData) => {
    const { auth, username, user_full_name, user_email, expires_in } =
      payloadData.payload;
    return {
      ...state,
      hasErrors: false,
      isAuthenticated: auth,
      username,
      user_full_name,
      user_email,
      expires_in,
    };
  }),
  on(LoginActions.authFail, (state, payloadData) => {
    // show the erors only in the console
    console.log('ERROR =>', payloadData);
    return {
      ...state,
      hasErrors: true,
      errMessage: 'Unexpected error',
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
