import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentReportItem, ReportSummary } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://doc-quintero-backend.onrender.com/api/reportes';

  constructor(private http: HttpClient) {}

  /**
   * Obtener citas por rango de fechas
   */
  getAppointmentsReport(startDate: string, endDate: string): Observable<AppointmentReportItem[]> {
    return this.http.get<AppointmentReportItem[]>('https://doc-quintero-backend.onrender.com/api/citas/rango', {
      params: { desde: startDate, hasta: endDate }
    });
  }

  /**
   * Obtener resumen de KPIs generales del consultorio
   */
  getReportSummary(): Observable<ReportSummary> {
    return this.http.get<ReportSummary>(`${this.apiUrl}/resumen`);
  }

  /**
   * Exportar lista de citas como archivo CSV descargable
   */
  exportToCSV(items: AppointmentReportItem[], filename: string): void {
    const headers = ['Paciente', 'Fecha y Hora', 'Tipo de Consulta', 'Estado', 'Duración (Min)', 'Notas'];
    const rows = items.map(item => [
      `"${item.patientName || 'Paciente'}"`,
      `"${new Date(item.fechaHora).toLocaleString('es-CO')}"`,
      `"${item.tipo || ''}"`,
      `"${item.estado || item.status || ''}"`,
      `"${item.duracionBloque || item.duracionMinutos || 30}"`,
      `"${(item.notas || item.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
