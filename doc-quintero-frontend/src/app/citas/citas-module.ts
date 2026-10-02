import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing-module';
import { CitaListComponent } from './cita-list/cita-list';
import { CitaCreateComponent } from './cita-create/cita-create';
import { CitaEditComponent } from './cita-edit/cita-edit';
import { AgendaSemanalComponent } from './agenda-semanal/agenda-semanal';

@NgModule({
  imports: [CommonModule, CitasRoutingModule, CitaListComponent, CitaCreateComponent, CitaEditComponent, AgendaSemanalComponent],
})
export class CitasModule {}
