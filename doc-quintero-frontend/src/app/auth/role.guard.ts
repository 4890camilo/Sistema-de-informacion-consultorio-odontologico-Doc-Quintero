import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data?.['roles'] || [];

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  if (expectedRoles.length === 0 || authService.hasAnyRole(expectedRoles)) {
    return true;
  }

  // Redirigir a una ruta permitida según el rol
  if (authService.hasAnyRole(['ODONTOLOGO'])) {
    router.navigate(['/historiaclinica/list']);
  } else if (authService.hasAnyRole(['AUXILIAR', 'RECEPCIONISTA'])) {
    router.navigate(['/citas/list']);
  } else {
    router.navigate(['/pacientes/list']);
  }
  return false;
};
