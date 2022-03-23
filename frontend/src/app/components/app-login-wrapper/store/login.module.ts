// import { NgModule } from '@angular/core';
// import { StoreModule } from '@ngrx/store';
// import * as fromLogin from './login.reducer';
// import { LoginEffects } from './login.effects';

// @NgModule({
//   imports: [
//     StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.reducer),
//     EffectsModule.forFeature([LoginEffects]),
//   ],
// })
// export class LoginModule {}

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginEffects } from './login.effects';
import * as fromLogin from './login.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.reducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
})
export class LoginModule {}
