import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HistoriaclinicaRoutingModule } from './historiaclinica-routing-module';
import { HistoriaListComponent } from './historia-list/historia-list';
import { HistoriaCreateComponent } from './historia-create/historia-create';
import { HistoriaEditComponent } from './historia-edit/historia-edit';
import { OdontogramaInteractiveComponent } from './odontograma-interactive/odontograma-interactive';
import { PatientHeaderComponent } from './patient-header/patient-header';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    HistoriaclinicaRoutingModule, 
    HistoriaListComponent, 
    HistoriaCreateComponent, 
    HistoriaEditComponent,
    OdontogramaInteractiveComponent,
    PatientHeaderComponent
  ],
  exports: [OdontogramaInteractiveComponent, PatientHeaderComponent]
})
export class HistoriaclinicaModule {}
