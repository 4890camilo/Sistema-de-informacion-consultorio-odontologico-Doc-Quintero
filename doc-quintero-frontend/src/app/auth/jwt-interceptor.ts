import { HttpInterceptorFn } from '@angular/common/http';
import { inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const ngZone = inject(NgZone);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: any) => {
      if (error?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        ngZone.run(() => router.navigate(['/auth/login']));
      }
      return throwError(() => error);
    })
  );
};
