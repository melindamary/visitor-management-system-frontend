import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  baseUrl = 'https://localhost:7121';

  login(data: any):Observable<any>{
    const url = `${this.baseUrl}/Auth/Login`;
    return this.http.post(url, data)
    .pipe(tap((result:any) => {
      console.log("Result",result)
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('authUser', JSON.stringify(result));
      }

    }),
    catchError(error => {
      console.error("HTTP Error", error);
      return throwError(() => new Error(error.message || 'Server Error'));
    })
  );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem('authUser');
      this.router.navigate(['/login']);
    }
    
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)){
      return localStorage.getItem('authUser')!== null;
    }
    return false;
  }
}
