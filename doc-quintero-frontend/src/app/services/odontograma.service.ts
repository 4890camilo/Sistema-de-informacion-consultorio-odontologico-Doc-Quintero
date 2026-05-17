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

  getOdontograma(hcId: string): Observable<OdontogramaResponse | null> {
    return this.http.get<OdontogramaResponse | null>(`${this.baseUrl}/${hcId}/odontograma/actual`);
  }

  createOdontograma(hcId: string, odontograma: OdontogramaRequest): Observable<OdontogramaResponse> {
    return this.http.post<OdontogramaResponse>(`${this.baseUrl}/${hcId}/odontograma`, odontograma);
  }

  updateOdontograma(hcId: string, odontograma: OdontogramaRequest): Observable<OdontogramaResponse> {
    // In new system, we just create a new version
    return this.http.post<OdontogramaResponse>(`${this.baseUrl}/${hcId}/odontograma`, odontograma);
  }

  deleteOdontograma(oid: string): Observable<void> {
    return this.http.patch<void>(`http://localhost:8080/api/historia-clinica/odontograma/${oid}/anular`, {});
  }
}
