import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodontogramaRequest, PeriodontogramaResponse } from '../models/periodontograma.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodontogramaService {
  private baseUrl = 'http://localhost:8080/api/historia-clinica';

  constructor(private http: HttpClient) {}

  getPeriodontograma(hcId: string): Observable<PeriodontogramaResponse | null> {
    return this.http.get<PeriodontogramaResponse | null>(`${this.baseUrl}/${hcId}/periodontograma/actual`);
  }

  createPeriodontograma(hcId: string, periodontograma: PeriodontogramaRequest): Observable<PeriodontogramaResponse> {
    return this.http.post<PeriodontogramaResponse>(`${this.baseUrl}/${hcId}/periodontograma`, periodontograma);
  }

  updatePeriodontograma(hcId: string, periodontograma: PeriodontogramaRequest): Observable<PeriodontogramaResponse> {
    // In new system, we just create a new control
    return this.http.post<PeriodontogramaResponse>(`${this.baseUrl}/${hcId}/periodontograma`, periodontograma);
  }

  deletePeriodontograma(pid: string): Observable<void> {
    return this.http.patch<void>(`http://localhost:8080/api/historia-clinica/periodontograma/${pid}/anular`, {});
  }
}
