import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authenticated = inject(AuthService).isAuthenticated();
  const router = inject(Router);
  if (!authenticated) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};