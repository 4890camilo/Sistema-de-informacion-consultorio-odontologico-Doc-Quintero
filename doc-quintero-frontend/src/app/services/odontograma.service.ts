import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OdontogramaRequest, OdontogramaResponse } from '../models/odontograma.model';

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {
  private apiUrl = 'http://localhost:8080/api/odontogram';

  constructor(private http: HttpClient) {}

  getOdontograma(patientId: string): Observable<OdontogramaResponse | null> {
    return this.http.get<OdontogramaResponse | null>(`${this.apiUrl}/${patientId}`);
  }

  createOdontograma(odontograma: OdontogramaRequest): Observable<OdontogramaResponse> {
    return this.http.post<OdontogramaResponse>(this.apiUrl, odontograma);
  }

  updateOdontograma(id: string, odontograma: OdontogramaRequest): Observable<OdontogramaResponse> {
    return this.http.put<OdontogramaResponse>(`${this.apiUrl}/${id}`, odontograma);
  }

  deleteOdontograma(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
