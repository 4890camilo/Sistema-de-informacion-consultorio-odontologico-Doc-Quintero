import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing-module';
import { CitaListComponent } from './cita-list/cita-list';
import { CitaCreateComponent } from './cita-create/cita-create';
import { CitaEditComponent } from './cita-edit/cita-edit';

@NgModule({
  imports: [CommonModule, CitasRoutingModule, CitaListComponent, CitaCreateComponent, CitaEditComponent],
})
export class CitasModule {}
