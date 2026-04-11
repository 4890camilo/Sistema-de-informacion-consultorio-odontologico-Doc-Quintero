import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodontogramaRequest, PeriodontogramaResponse } from '../models/periodontograma.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodontogramaService {
  private apiUrl = 'http://localhost:8080/api/periodontogram';

  constructor(private http: HttpClient) {}

  getPeriodontograma(patientId: string): Observable<PeriodontogramaResponse | null> {
    return this.http.get<PeriodontogramaResponse | null>(`${this.apiUrl}/${patientId}`);
  }

  createPeriodontograma(periodontograma: PeriodontogramaRequest): Observable<PeriodontogramaResponse> {
    return this.http.post<PeriodontogramaResponse>(this.apiUrl, periodontograma);
  }

  updatePeriodontograma(id: string, periodontograma: PeriodontogramaRequest): Observable<PeriodontogramaResponse> {
    return this.http.put<PeriodontogramaResponse>(`${this.apiUrl}/${id}`, periodontograma);
  }

  deletePeriodontograma(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
