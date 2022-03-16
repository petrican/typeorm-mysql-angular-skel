import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs';
import * as fromLogin from './login.actions';
import { AuthResponseData } from './login.types';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  handleAuthentication = (
    auth: boolean,
    token: string,
    username: string,
    user_full_name: string,
    user_email: string,
    role: string,
    expires_in: number
  ) => {
    const expirationDate = new Date(new Date().getTime() + expires_in * 1000);
    const user = new User(
      auth,
      token,
      username,
      user_full_name,
      user_email,
      role
    );
    localStorage.setItem('userData', JSON.stringify(user));

    const authSuccess = new fromLogin.AuthenticateSuccess({
      auth,
      token,
      username,
      user_full_name,
      user_email,
      role,
      expirationDate,
      redirect: true,
    });

    this.store.dispatch(authSuccess);
    return authSuccess;
  };

  authLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromLogin.loginToServer),
        switchMap((authData: fromLogin.LoginStart) => {
          return this.http
            .post<AuthResponseData>('http://localhost:3000/login', {
              username: authData.payload.username,
              password: authData.payload.password,
            })
            .pipe(
              map((resData) => {
                return this.handleAuthentication(
                  resData.auth,
                  resData.token,
                  resData.username,
                  resData.user_full_name,
                  resData.user_email,
                  resData.user_role,
                  resData.expires_in
                );
              }),
              catchError((errorRes) => {
                return handleError(errorRes);
              })
            );
        })
      ),
    { dispatch: false }
  );
}
function handleError(errorRes: any): any {
  throw new Error('Function not implemented.');
}
