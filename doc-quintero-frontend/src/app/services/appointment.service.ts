import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentRequest, AppointmentResponse, AvailabilitySlot, AppointmentListItem } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://doc-quintero-backend.onrender.com/api/citas';

  constructor(private http: HttpClient) {}

  /**
   * Get all appointments with optional filters
   */
  getAllAppointments(startDate?: string, endDate?: string): Observable<AppointmentResponse[]> {
    let url = this.apiUrl;
    if (startDate && endDate) {
      url += `?start=${startDate}&end=${endDate}`;
    }
    return this.http.get<AppointmentResponse[]>(url);
  }

  /**
   * Create a new appointment
   */
  createAppointment(appointment: AppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(this.apiUrl, appointment);
  }

  /**
   * Reschedule appointment
   */
  rescheduleAppointment(id: string, newDateTime: string): Observable<AppointmentResponse> {
    return this.http.put<AppointmentResponse>(
      `${this.apiUrl}/${id}/reschedule`,
      {},
      { params: { newDateTime } }
    );
  }

  /**
   * Get available slots for a specific date
   */
  getAvailableSlots(date: string): Observable<AvailabilitySlot[]> {
    return this.http.get<AvailabilitySlot[]>(`${this.apiUrl}/availability`, {
      params: { date }
    });
  }

  /**
   * Get appointments report (admin only)
   */
  getAppointmentsReport(startDate: string, endDate: string): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.apiUrl}/report`, {
      params: { start: startDate, end: endDate }
    });
  }

  /**
   * Cancel appointment
   */
  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
