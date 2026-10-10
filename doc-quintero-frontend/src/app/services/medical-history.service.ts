import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalHistoryRequest, MedicalHistoryResponse, MedicalHistoryListItem } from '../models/medical-history.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  private apiUrl = 'https://doc-quintero-backend.onrender.com/api/historia-clinica';

  constructor(private http: HttpClient) {}

  getMedicalHistory(patientId: string): Observable<MedicalHistoryResponse> {
    return this.http.get<MedicalHistoryResponse>(`${this.apiUrl}/paciente/${patientId}`);
  }

  createMedicalHistory(history: MedicalHistoryRequest): Observable<MedicalHistoryResponse> {
    return this.http.post<MedicalHistoryResponse>(this.apiUrl, history);
  }

  updateMedicalHistory(id: string, history: MedicalHistoryRequest): Observable<MedicalHistoryResponse> {
    return this.http.put<MedicalHistoryResponse>(`${this.apiUrl}/${id}`, history);
  }

  getAllMedicalHistories(): Observable<MedicalHistoryListItem[]> {
    return this.http.get<MedicalHistoryListItem[]>(this.apiUrl);
  }
}
