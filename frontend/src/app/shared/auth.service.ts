import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromLogin from '../components/app-login-wrapper/store/login.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store) {}

  doLogout() {
    localStorage.removeItem('userData');
    this.store.dispatch(fromLogin.logoutFromServer());
  }
}
