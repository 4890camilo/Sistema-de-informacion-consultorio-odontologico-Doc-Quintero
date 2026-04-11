import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaListComponent } from './cita-list/cita-list';
import { CitaCreateComponent } from './cita-create/cita-create';
import { CitaEditComponent } from './cita-edit/cita-edit';

const routes: Routes = [
  { path: 'list', component: CitaListComponent },
  { path: 'create', component: CitaCreateComponent },
  { path: 'edit/:id', component: CitaEditComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasRoutingModule {}
