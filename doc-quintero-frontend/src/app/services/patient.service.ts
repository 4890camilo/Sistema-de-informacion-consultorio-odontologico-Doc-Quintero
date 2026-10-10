import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRequest, PatientResponse, PatientListItem } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'https://doc-quintero-backend.onrender.com/api/pacientes';

  constructor(private http: HttpClient) {}

  /**
   * Get all patients
   */
  getAllPatients(): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(this.apiUrl);
  }

  /**
   * Get patient by ID
   */
  getPatientById(id: string): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new patient
   */
  createPatient(patient: PatientRequest): Observable<PatientResponse> {
    return this.http.post<PatientResponse>(this.apiUrl, patient);
  }

  /**
   * Update patient data
   */
  updatePatient(id: string, patient: PatientRequest): Observable<PatientResponse> {
    return this.http.put<PatientResponse>(`${this.apiUrl}/${id}`, patient);
  }

  /**
   * Delete patient (if available)
   */
  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Search patients by name or ID
   */
  searchPatients(query: string): Observable<PatientListItem[]> {
    return this.http.get<PatientListItem[]>(`${this.apiUrl}?search=${query}`);
  }
}
