import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'pacientes',
    canActivate: [authGuard],
    loadChildren: () => import('./pacientes/pacientes-module').then(m => m.PacientesModule)
  },
  {
    path: 'citas',
    canActivate: [authGuard],
    loadChildren: () => import('./citas/citas-module').then(m => m.CitasModule)
  },
  {
    path: 'historiaclinica',
    canActivate: [authGuard],
    loadChildren: () => import('./historiaclinica/historiaclinica-module').then(m => m.HistoriaclinicaModule)
  },
  {
    path: 'reportes',
    canActivate: [authGuard],
    loadChildren: () => import('./reportes/reportes-module').then(m => m.ReportesModule)
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
