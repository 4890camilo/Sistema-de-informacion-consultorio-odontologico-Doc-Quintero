import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentReportItem, ReportSummary, ReportFilter } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reportes';

  constructor(private http: HttpClient) {}

  /**
   * Get appointments report for admin
   */
  getAppointmentsReport(startDate: string, endDate: string): Observable<AppointmentReportItem[]> {
    return this.http.get<AppointmentReportItem[]>('http://localhost:8080/api/citas/rango', {
      params: { desde: startDate, hasta: endDate }
    });
  }

  /**
   * Get report summary
   */
  getReportSummary(): Observable<ReportSummary> {
    return this.http.get<ReportSummary>(`${this.apiUrl}/resumen`);
  }

  /**
   * Export report as CSV (Stub)
   */
  exportReportAsCSV(startDate: string, endDate: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/resumen`, { responseType: 'blob' });
  }
}
