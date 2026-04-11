import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentReportItem, ReportSummary, ReportFilter } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/appointments/report';

  constructor(private http: HttpClient) {}

  /**
   * Get appointments report for admin
   */
  getAppointmentsReport(startDate: string, endDate: string): Observable<AppointmentReportItem[]> {
    return this.http.get<AppointmentReportItem[]>(this.apiUrl, {
      params: { start: startDate, end: endDate }
    });
  }

  /**
   * Get report summary
   */
  getReportSummary(startDate: string, endDate: string): Observable<ReportSummary> {
    return this.http.get<ReportSummary>(`${this.apiUrl}/summary`, {
      params: { start: startDate, end: endDate }
    });
  }

  /**
   * Export report as CSV
   */
  exportReportAsCSV(startDate: string, endDate: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, {
      params: { start: startDate, end: endDate },
      responseType: 'blob'
    });
  }
}
