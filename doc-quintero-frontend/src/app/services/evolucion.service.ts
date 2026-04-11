import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvolucionRequest, EvolucionResponse, EvolucionListItem } from '../models/evolucion.model';

@Injectable({
  providedIn: 'root'
})
export class EvolucionService {
  private apiUrl = 'http://localhost:8080/api/patient-evolution';

  constructor(private http: HttpClient) {}

  getEvolucionesByPatientId(patientId: string): Observable<EvolucionListItem[]> {
    return this.http.get<EvolucionListItem[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  getEvolucionById(id: string): Observable<EvolucionResponse> {
    return this.http.get<EvolucionResponse>(`${this.apiUrl}/${id}`);
  }

  createEvolucion(evolucion: EvolucionRequest): Observable<EvolucionResponse> {
    return this.http.post<EvolucionResponse>(this.apiUrl, evolucion);
  }

  updateEvolucion(id: string, evolucion: EvolucionRequest): Observable<EvolucionResponse> {
    return this.http.put<EvolucionResponse>(`${this.apiUrl}/${id}`, evolucion);
  }

  deleteEvolucion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
