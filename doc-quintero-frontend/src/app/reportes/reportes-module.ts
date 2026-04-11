import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing-module';
import { ReporteListComponent } from './reporte-list/reporte-list';

@NgModule({
  imports: [CommonModule, ReportesRoutingModule, ReporteListComponent],
})
export class ReportesModule {}
