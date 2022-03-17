import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoginWrapperComponent } from './components/app-login-wrapper/app-login-wrapper.component';
import { StoreModule } from '@ngrx/store';
import { LoginModule } from './components/app-login-wrapper/store/login.module';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './components/app-login-wrapper/store/login.effects';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, AppLoginWrapperComponent, DashboardComponent, NavbarComponent, AutoFocusDirective],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([LoginEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LoginModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
