import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TratamientoRequest, TratamientoResponse, TratamientoListItem } from '../models/tratamiento.model';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private apiUrl = 'https://doc-quintero-backend.onrender.com/api/planes-tratamiento';

  constructor(private http: HttpClient) {}

  getTratamientosByPatientId(patientId: string): Observable<TratamientoListItem[]> {
    return this.http.get<TratamientoListItem[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  getTratamientoById(id: string): Observable<TratamientoResponse> {
    return this.http.get<TratamientoResponse>(`${this.apiUrl}/${id}`);
  }

  createTratamiento(tratamiento: TratamientoRequest): Observable<TratamientoResponse> {
    return this.http.post<TratamientoResponse>(this.apiUrl, tratamiento);
  }

  updateTratamiento(id: string, tratamiento: TratamientoRequest): Observable<TratamientoResponse> {
    return this.http.put<TratamientoResponse>(`${this.apiUrl}/${id}`, tratamiento);
  }

  deleteTratamiento(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
