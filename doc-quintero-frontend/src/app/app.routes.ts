import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes-module').then(m => m.PacientesModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./citas/citas-module').then(m => m.CitasModule)
  },
  {
    path: 'historiaclinica',
    loadChildren: () => import('./historiaclinica/historiaclinica-module').then(m => m.HistoriaclinicaModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes-module').then(m => m.ReportesModule)
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];
