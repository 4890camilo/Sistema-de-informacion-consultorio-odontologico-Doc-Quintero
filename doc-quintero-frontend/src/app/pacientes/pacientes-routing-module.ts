import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteListComponent } from './paciente-list/paciente-list';
import { PacienteCreateComponent } from './paciente-create/paciente-create';
import { PacienteEditComponent } from './paciente-edit/paciente-edit';

const routes: Routes = [
  { path: 'list', component: PacienteListComponent },
  { path: 'create', component: PacienteCreateComponent },
  { path: 'edit/:id', component: PacienteEditComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}
