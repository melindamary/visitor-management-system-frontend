import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

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
  userRole:any = '';

  login(data: any):Observable<any>{
    const url = `${this.baseUrl}/Auth/Login`;
    return this.http.post(url, data)
    .pipe(tap((response:any) => {
      console.log("Result",response)
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('authUser', response.result.username);
      }

    }),
    catchError(error => {
      console.error("HTTP Error", error);
      return throwError(() => new Error(error.message || 'Server Error'));
    })
  );
  }

  getUserRole(username: string):Observable<any>{
    const url = `${this.baseUrl}/User/GetUserRoleByUsername/${username}`;
    return this.http.get(url).pipe(
      tap((response:any) => {
        this.userRole = response.result.value.roleName;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('userRole', response.result.value.roleName);
        }
      }),
      catchError(error => {
        console.error("Error fetching role:", error);
        return throwError(() => new Error(error.message)); // Propagate the error
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem('authUser');
      localStorage.removeItem('userRole');
      this.router.navigate(['/login']);
    }
    
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)){
      return localStorage.getItem('authUser')!== null;
    }
    return false;
  }


getMenuItems(): any {
  this.userRole = localStorage.getItem('userRole');
  const adminMenu = [
    { label: 'Dashboard', icon: 'dashboard', routerLink: '/vms/dashboard' },
    { label: 'Visitor Log', icon: 'assignment_ind', routerLink: '/vms/visitor-log' },
    { label: 'Reports', icon: 'description', routerLink: '/vms/reports' },
    { label: 'Admin Panel', icon: 'settings', routerLink: '/vms/admin-panel' }
  ];

  const securityMenu = [
    { label: 'Visitor Log', icon: 'assignment_ind', routerLink: '/vms/visitor-log' },
    { label: 'Reports', icon: 'description', routerLink: '/vms/reports' }
  ];

  const auditsMenu = [
    { label: 'Dashboard', icon: 'dashboard', routerLink: '/vms/dashboard' },
    { label: 'Reports', icon: 'description', routerLink: '/vms/reports' }
  ];

  switch (this.userRole) {
    case 'Admin':
      return adminMenu;
    case 'Security':
      return securityMenu;
    case 'ACE':
      return auditsMenu;
    default:
      return [];
  }
}
}