import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject,Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    public http:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  getToken(){
    if (isPlatformBrowser(this.platformId)) {
      var authData = localStorage.getItem('authUser');
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.token || null;
      }
    }
  }

  getUsername(){
    if (isPlatformBrowser(this.platformId)) {
      var authData = localStorage.getItem('authUser');
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.username || null;
      }
    }
  }

  getLocation(){
    if (isPlatformBrowser(this.platformId)) {
      var authData = localStorage.getItem('authUser');
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.location || null;
      }
    }
  }

  getRole(){
    if (isPlatformBrowser(this.platformId)) {
      var authData = localStorage.getItem('authUser');
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.role || null;
      }
    }
  }


}