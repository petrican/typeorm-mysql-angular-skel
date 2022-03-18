import { createAction, props, Action } from '@ngrx/store';
import { loginPayloadType, AuthResponseData } from './login.types';
import {
  LOGIN_START,
  LOGOUT_ACTION,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
} from './login.constants';

export const loginToServer = createAction(
  LOGIN_START,
  props<{ payload: loginPayloadType }>()
);

export const authFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ payload: string }>()
);

export const authSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{ payload: AuthResponseData }>()
);

export const logoutFromServer = createAction(LOGOUT_ACTION);

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: loginPayloadType) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      auth: boolean;
      token: string;
      username: string;
      user_full_name: string;
      user_email: string;
      role: string;
      expires_in: Date;
      redirect: boolean;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export type AuthActions = LoginStart | AuthenticateSuccess | AuthenticateFail;
