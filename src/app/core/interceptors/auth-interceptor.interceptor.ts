import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authServices/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      const authDataJson = localStorage.getItem('authUser');
      if (authDataJson !== null) {
        const authData = JSON.parse(authDataJson);
        const token = authData?.token;

        if (token) {
          // Clone the request and add the Authorization header
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          });
          return next.handle(clonedRequest);
        }
      }
    }

    // If no token is found, or not running in the browser, just proceed with the request
    return next.handle(req);
  }
}
