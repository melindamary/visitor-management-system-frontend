import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthSecurityGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const userRole = localStorage.getItem('userRole');
      if (this.authService.isLoggedIn() && (userRole === 'Security' || userRole === 'SuperAdmin' || userRole === 'Admin')) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Handle non-browser environments if necessary
      this.router.navigate(['/login']);
      return false;
    }
  }
}
