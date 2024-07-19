import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

  baseUrl = 'https://localhost:7121';

  login(data: any):Observable<any>{
    console.log("Entered login");
    const url = `${this.baseUrl}/Auth/Login`;
    return this.http.post(url, data)
    .pipe(tap((result) => {
      console.log("Result",result)
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('authUser', JSON.stringify(result));
      }

    }));
  }

  logout() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem('authUser');
    }
    
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)){
      return localStorage.getItem('authUser')!== null;
    }
    return false;
  }
}
