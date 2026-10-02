import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OdontogramaRequest, OdontogramaResponse } from '../models/odontograma.model';

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {
  private baseUrl = 'http://localhost:8080/api/historia-clinica';

  constructor(private http: HttpClient) {}

  getOdontogramaActual(hcId: string): Observable<OdontogramaResponse | null> {
    return this.http.get<OdontogramaResponse | null>(`${this.baseUrl}/${hcId}/odontograma/actual`);
  }

  getVersiones(hcId: string): Observable<OdontogramaResponse[]> {
    return this.http.get<OdontogramaResponse[]>(`${this.baseUrl}/${hcId}/odontograma`);
  }

  guardarOdontograma(hcId: string, request: OdontogramaRequest): Observable<OdontogramaResponse> {
    return this.http.post<OdontogramaResponse>(`${this.baseUrl}/${hcId}/odontograma`, request);
  }

  anularOdontograma(oid: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/odontograma/${oid}/anular`, {});
  }
}
