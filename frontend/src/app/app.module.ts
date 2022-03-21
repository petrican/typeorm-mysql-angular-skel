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
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { SettingsComponent } from './components/settings/settings.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AppLoginWrapperComponent,
    DashboardComponent,
    NavbarComponent,
    AutoFocusDirective,
    SettingsComponent,
    FooterComponent,
  ],
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
