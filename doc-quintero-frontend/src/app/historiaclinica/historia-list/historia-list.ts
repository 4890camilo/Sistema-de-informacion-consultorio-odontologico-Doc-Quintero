import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { MedicalHistoryService } from '../../services/medical-history.service';
import { MedicalHistoryResponse } from '../../models/medical-history.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-historia-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historia-list.html',
  styleUrl: './historia-list.scss',
})
export class HistoriaListComponent implements OnInit, OnDestroy {
  patients: PatientResponse[] = [];
  selectedPatient: PatientResponse | null = null;
  medicalHistory: MedicalHistoryResponse | null = null;
  isLoadingPatients = false;
  isLoadingHistory = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private patientService: PatientService,
    private medicalHistoryService: MedicalHistoryService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPatients(): void {
    this.isLoadingPatients = true;
    this.patientService.getAllPatients()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => { this.isLoadingPatients = false; })
      )
      .subscribe({
        next: (data: PatientResponse[]) => {
          this.patients = data;
        },
        error: (error: any) => {
          this.errorMessage = 'Error al cargar pacientes';
          console.error('Error loading patients', error);
        }
      });
  }

  selectPatient(patient: PatientResponse): void {
    this.selectedPatient = patient;
    this.loadMedicalHistory(patient.id!);
  }

  loadMedicalHistory(patientId: string): void {
    this.isLoadingHistory = true;
    this.errorMessage = '';
    this.medicalHistoryService.getMedicalHistory(patientId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => { this.isLoadingHistory = false; })
      )
      .subscribe({
        next: (data: MedicalHistoryResponse | null) => {
          this.medicalHistory = data || null;
        },
        error: (error: any) => {
          if (error.status === 404 || error.status === 204) {
            this.medicalHistory = null;
          } else {
            this.errorMessage = 'Ocurrió un error al cargar la información. Intenta de nuevo.';
          }
        }
      });
  }

  createMedicalHistory(): void {
    if (this.selectedPatient) {
      this.router.navigate(['/historiaclinica/create', this.selectedPatient.id]);
    }
  }

  editMedicalHistory(): void {
    if (this.selectedPatient && this.medicalHistory) {
      this.router.navigate(['/historiaclinica/edit', this.selectedPatient.id]);
    }
  }

  goBack(): void {
    this.selectedPatient = null;
    this.medicalHistory = null;
  }
}
