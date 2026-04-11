import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalHistoryRequest, MedicalHistoryResponse, MedicalHistoryListItem } from '../models/medical-history.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  private apiUrl = 'http://localhost:8080/api/medical-history';

  constructor(private http: HttpClient) {}

  /**
   * Get medical history for a patient
   */
  getMedicalHistory(patientId: string): Observable<MedicalHistoryResponse> {
    return this.http.get<MedicalHistoryResponse>(`${this.apiUrl}/${patientId}`);
  }

  /**
   * Create medical history for a patient
   */
  createMedicalHistory(patientId: string, history: MedicalHistoryRequest): Observable<MedicalHistoryResponse> {
    return this.http.post<MedicalHistoryResponse>(`${this.apiUrl}/${patientId}`, history);
  }

  /**
   * Update medical history
   */
  updateMedicalHistory(patientId: string, history: MedicalHistoryRequest): Observable<MedicalHistoryResponse> {
    return this.http.put<MedicalHistoryResponse>(`${this.apiUrl}/${patientId}`, history);
  }

  /**
   * Get all medical histories (for filtering/search)
   */
  getAllMedicalHistories(): Observable<MedicalHistoryListItem[]> {
    return this.http.get<MedicalHistoryListItem[]>(this.apiUrl);
  }
}
