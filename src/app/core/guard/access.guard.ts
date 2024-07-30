// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/authServices/auth.service';
// import { isPlatformBrowser,} from '@angular/common';
// import { Component, PLATFORM_ID } from '@angular/core';

// export const authAceGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   const platformId = inject(PLATFORM_ID);
  
//   const username = localStorage.getItem('userRole');
//   if (authService.isLoggedIn() &&  ((username == 'ACE') || (username == 'Admin'))) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// };

import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const userRole = localStorage.getItem('userRole');
      if (this.authService.isLoggedIn() && (userRole === 'ACE' || userRole === 'Admin' || userRole === 'Security')) {
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
