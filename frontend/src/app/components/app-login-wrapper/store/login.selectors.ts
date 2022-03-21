import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState, loginFeatureKey } from './login.reducer';

const getLoginState = createFeatureSelector<LoginState>(loginFeatureKey);

export const getLoginErrors = createSelector(getLoginState, (state) => {
  return state.hasErrors;
});

export const getAuthStatus = createSelector(getLoginState, (state) => {
  return state.isAuthenticated;
});

export const getFullUserName = createSelector(getLoginState, (state) => {
  return state['user_full_name'];
});
