import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Inject,Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SharedService } from '../shared-service/shared-data.service.service';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private sharedService: SharedService
  ) { }

  // baseUrl = 'https://localhost:7121';
  baseUrl = environment.apiUrl
  userRole:any = '';

  updateLogoutStatus():Observable<any>{
    const url = `${this.baseUrl}/Auth/Logout`;
    var username = this.sharedService.getUsername();
    const body = { Username: username};
    console.log(body)
    return this.http.put(`${this.baseUrl}/Auth/Logout`, body);
  }

  login(data: any):Observable<any>{
    const url = `${this.baseUrl}/Auth/Login`;
    return this.http.post(url, data)
    .pipe(tap((response:any) => {
      console.log("Result",response)
      if (isPlatformBrowser(this.platformId)) {
        const authData = {
          username: response.result.username,
          token: response.result.token,
          location: response.result.location,
          role: response.result.role
      };
      
      localStorage.setItem('authUser', JSON.stringify(authData));
      }
    }),
    catchError(error => {
      console.error("HTTP Error", error);
      return throwError(() => new Error(error.message || 'Server Error'));
    })
  );
  }

  getToken(){
    if (isPlatformBrowser(this.platformId)) {
      var authData = localStorage.getItem('authUser');
      if (authData) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.token || null;
      }
    }
  }


  getUserRole(username: string):Observable<any>{
    const url = `${this.baseUrl}/User/UserRoleByUsername/${username}`;
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
    this.updateLogoutStatus().subscribe({
      next: (response) => {
        console.log(response);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('authUser');
          localStorage.removeItem('userRole');
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)){
      return localStorage.getItem('authUser')!== null;
    }
    return false;
  }


getMenuItems(): any {
  if (isPlatformBrowser(this.platformId)){
  this.userRole = localStorage.getItem('userRole');
  }
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
    case 'SuperAdmin':
      return adminMenu;
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