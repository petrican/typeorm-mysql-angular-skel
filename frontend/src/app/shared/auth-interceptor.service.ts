import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const localToken = this.authService.getLocalToken();
    const modifiedReq = req.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer: ${localToken}`),
    });
    return next.handle(modifiedReq);
  }
}
