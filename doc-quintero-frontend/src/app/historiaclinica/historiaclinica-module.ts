import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaclinicaRoutingModule } from './historiaclinica-routing-module';
import { HistoriaListComponent } from './historia-list/historia-list';
import { HistoriaCreateComponent } from './historia-create/historia-create';
import { HistoriaEditComponent } from './historia-edit/historia-edit';

@NgModule({
  imports: [CommonModule, HistoriaclinicaRoutingModule, HistoriaListComponent, HistoriaCreateComponent, HistoriaEditComponent],
})
export class HistoriaclinicaModule {}
