import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromLogin from './store/login.actions';
import { getAuthStatus } from './store/login.selectors';
@Component({
  selector: 'app-app-login-wrapper',
  templateUrl: './app-login-wrapper.component.html',
  styleUrls: ['./app-login-wrapper.component.scss'],
})
export class AppLoginWrapperComponent implements OnInit, OnDestroy {
  isLoading = false;
  rememberMe: boolean = true;
  rememberedUserName: string = '';

  private subAuth: Subscription | undefined;

  constructor(private readonly store: Store, private router: Router) {}

  ngOnInit(): void {
    const rememberUserData = this.getRememberUser();
    this.rememberMe = rememberUserData.remember;
    this.rememberedUserName = this.rememberMe ? rememberUserData.username : '';
    this.subAuth = this.store.select(getAuthStatus).subscribe((authState) => {
      if (authState) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onLoginSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.updateLocalStoreUserRemember(form.value.rememberMe, username);

    if (username && password) {
      this.store.dispatch(
        fromLogin.loginToServer({ payload: { username, password } })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subAuth) this.subAuth.unsubscribe();
  }

  private getRememberUser() {
    let result = { username: '', remember: true };
    const userRemember = localStorage.getItem('userRemember');
    if (userRemember) {
      const { username, remember } = JSON.parse(userRemember);
      result = { username, remember };
    }
    return result;
  }

  private updateLocalStoreUserRemember(remember: boolean, username: string) {
    localStorage.setItem(
      'userRemember',
      JSON.stringify({ remember, username })
    );
  }
}
