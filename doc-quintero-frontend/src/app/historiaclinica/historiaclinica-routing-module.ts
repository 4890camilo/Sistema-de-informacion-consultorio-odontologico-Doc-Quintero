import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaListComponent } from './historia-list/historia-list';
import { HistoriaCreateComponent } from './historia-create/historia-create';
import { HistoriaEditComponent } from './historia-edit/historia-edit';

const routes: Routes = [
  { path: 'list', component: HistoriaListComponent },
  { path: 'create/:id', component: HistoriaCreateComponent },
  { path: 'edit/:id', component: HistoriaEditComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriaclinicaRoutingModule {}
