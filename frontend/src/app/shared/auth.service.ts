import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import * as fromLogin from '../components/app-login-wrapper/store/login.actions';
import { User } from '../components/app-login-wrapper/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store, private router: Router) {}

  doLogout() {
    localStorage.removeItem('userData');
    this.store.dispatch(fromLogin.logoutFromServer());
    this.router.navigate(['/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userDataLocalStorage = localStorage.getItem('userData');

    if (!userDataLocalStorage) {
      return;
    } else {
      const userData = JSON.parse(userDataLocalStorage);

      const authSuccess = new fromLogin.AuthenticateSuccess({
        auth: userData.auth,
        token: userData._token,
        username: userData.username,
        user_full_name: userData.user_full_name,
        user_email: userData.user_email,
        role: userData.role,
        expires_in: userData._tokenExpirationDate,
        redirect: true,
      });

      this.store.dispatch(authSuccess);

      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      if (expirationDuration < 0) {
        this.doLogout();
      }
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.doLogout();
    }, expirationDuration);
  }

  getLocalToken() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData)._token;
    } else {
      return null;
    }
  }
}
