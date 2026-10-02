import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { AppointmentReportItem, ReportSummary } from '../../models/report.model';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

export interface RangoSummary {
  totalCitas: number;
  atendidas: number;
  anuladas: number;
  pendientes: number;
  ingresosEstimados: number;
}

@Component({
  standalone: true,
  selector: 'app-reporte-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reporte-list.html',
  styleUrl: './reporte-list.scss',
})
export class ReporteListComponent implements OnInit, OnDestroy {
  reportForm: FormGroup;
  appointments: AppointmentReportItem[] = [];
  filteredAppointments: AppointmentReportItem[] = [];
  
  // KPIs del sistema (backend /api/reportes/resumen)
  systemKpis: ReportSummary | null = null;

  // Métricas del rango seleccionado
  rangoSummary: RangoSummary = {
    totalCitas: 0,
    atendidas: 0,
    anuladas: 0,
    pendientes: 0,
    ingresosEstimados: 0
  };

  // Filtros adicionales
  filtroTipo: string = 'TODOS';
  filtroEstado: string = 'TODOS';

  isLoadingReport = false;
  isLoadingKpis = false;
  errorMessage = '';
  successMessage = '';

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = today.toISOString().split('T')[0];

    this.reportForm = this.fb.group({
      startDate: [firstDay, Validators.required],
      endDate: [lastDay, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSystemKpis();
    this.generateReport();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSystemKpis(): void {
    this.isLoadingKpis = true;
    this.reportService.getReportSummary()
      .pipe(takeUntil(this.destroy$), finalize(() => this.isLoadingKpis = false))
      .subscribe({
        next: (data) => {
          this.systemKpis = data;
        },
        error: (err) => {
          console.error('Error cargando KPIs del sistema:', err);
        }
      });
  }

  generateReport(): void {
    if (this.reportForm.valid) {
      this.isLoadingReport = true;
      this.errorMessage = '';
      this.successMessage = '';
      const { startDate, endDate } = this.reportForm.value;

      this.reportService.getAppointmentsReport(startDate, endDate)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { this.isLoadingReport = false; })
        )
        .subscribe({
          next: (data: AppointmentReportItem[]) => {
            this.appointments = data || [];
            this.aplicarFiltros();
          },
          error: (error: any) => {
            this.errorMessage = 'Error al consultar reporte por fechas.';
            console.error('Error generando reporte:', error);
          },
        });
    }
  }

  aplicarFiltros(): void {
    let result = [...this.appointments];

    if (this.filtroTipo !== 'TODOS') {
      result = result.filter(a => a.tipo === this.filtroTipo);
    }

    if (this.filtroEstado !== 'TODOS') {
      result = result.filter(a => (a.estado === this.filtroEstado || a.status === this.filtroEstado));
    }

    this.filteredAppointments = result;
    this.calcularMeticasRango();
  }

  calcularMeticasRango(): void {
    const total = this.filteredAppointments.length;
    const atendidas = this.filteredAppointments.filter(a => {
      const st = a.estado || a.status;
      return st === 'ATENDIDA' || st === 'CONFIRMADA';
    }).length;

    const anuladas = this.filteredAppointments.filter(a => {
      const st = a.estado || a.status;
      return st === 'ANULADA' || st === 'NO_ASISTIO' || st === 'CANCELADA';
    }).length;

    const pendientes = this.filteredAppointments.filter(a => {
      const st = a.estado || a.status;
      return st === 'RESERVADA' || st === 'PENDIENTE';
    }).length;

    const ingresos = atendidas * 120000; // $120.000 COP estimación por cita atendida

    this.rangoSummary = {
      totalCitas: total,
      atendidas: atendidas,
      anuladas: anuladas,
      pendientes: pendientes,
      ingresosEstimados: ingresos
    };
  }

  exportReport(): void {
    if (this.filteredAppointments.length === 0) {
      this.errorMessage = 'No hay datos en el reporte para exportar.';
      return;
    }

    const { startDate, endDate } = this.reportForm.value;
    const filename = `reporte-gestion-citas-${startDate}-al-${endDate}.csv`;
    this.reportService.exportToCSV(this.filteredAppointments, filename);
    this.successMessage = '✅ Reporte descargado exitosamente como archivo CSV.';
    setTimeout(() => this.successMessage = '', 3500);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
