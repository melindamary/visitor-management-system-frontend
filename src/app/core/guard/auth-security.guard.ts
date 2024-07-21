import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authServices/auth.service';

export const authSecurityGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const username = localStorage.getItem('userRole');
  if (authService.isLoggedIn() &&  ((username == 'Security') || (username == 'Admin'))) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
