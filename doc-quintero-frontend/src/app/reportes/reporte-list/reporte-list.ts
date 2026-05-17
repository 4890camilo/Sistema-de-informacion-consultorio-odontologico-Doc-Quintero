import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { AppointmentReportItem } from '../../models/report.model';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

interface ReportSummary {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
}

@Component({
  standalone: true,
  selector: 'app-reporte-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reporte-list.html',
  styleUrl: './reporte-list.scss',
})
export class ReporteListComponent implements OnInit, OnDestroy {
  reportForm: FormGroup;
  appointments: AppointmentReportItem[] = [];
  summary: ReportSummary | null = null;
  isLoadingReport = false;
  isLoadingExport = false;
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
    this.generateReport();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  generateReport(): void {
    if (this.reportForm.valid) {
      this.isLoadingReport = true;
      this.errorMessage = '';
      const { startDate, endDate } = this.reportForm.value;
      
      this.reportService.getAppointmentsReport(startDate, endDate)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { this.isLoadingReport = false; })
        )
        .subscribe({
          next: (data: AppointmentReportItem[]) => {
            this.appointments = data;
            this.calculateSummary();
          },
          error: (error: any) => {
            this.errorMessage = 'Error al generar reporte. Por favor intenta nuevamente.';
            console.error('Error generating report:', error);
          },
        });
    }
  }

  calculateSummary(): void {
    const total = this.appointments.length;
    const completed = this.appointments.filter(a => a.status === 'CONFIRMADA').length;
    const cancelled = this.appointments.filter(a => a.status === 'CANCELADA').length;

    this.summary = {
      totalAppointments: total,
      completedAppointments: completed,
      cancelledAppointments: cancelled,
      totalRevenue: completed * 50 // Valor estimado por cita
    };
  }

  exportReport(): void {
    if (this.appointments.length === 0) {
      this.errorMessage = 'No hay datos para exportar';
      return;
    }

    this.isLoadingExport = true;
    const { startDate, endDate } = this.reportForm.value;
    
    this.reportService.exportReportAsCSV(startDate, endDate)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => { this.isLoadingExport = false; })
      )
      .subscribe({
        next: (blob) => {
          this.downloadFile(blob, `reporte-citas-${startDate}-${endDate}.csv`);
          this.successMessage = 'Reporte exportado exitosamente';
        },
        error: (error) => {
          this.errorMessage = 'Error al exportar reporte';
          console.error('Error exporting report:', error);
        },
      });
  }

  private downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
