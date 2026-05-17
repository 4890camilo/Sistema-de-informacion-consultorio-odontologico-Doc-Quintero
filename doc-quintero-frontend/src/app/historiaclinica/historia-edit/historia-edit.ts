import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedicalHistoryService } from '../../services/medical-history.service';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { MedicalHistoryResponse } from '../../models/medical-history.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-historia-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './historia-edit.html',
  styleUrl: './historia-edit.scss',
})
export class HistoriaEditComponent implements OnInit, OnDestroy {
  historyForm: FormGroup;
  patientId: string = '';
  patient: PatientResponse | null = null;
  medicalHistory: MedicalHistoryResponse | null = null;
  isLoadingPage = false;
  isLoadingForm = false;
  errorMessage = '';
  successMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private medicalHistoryService: MedicalHistoryService,
    private patientService: PatientService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.historyForm = this.fb.group({
      reasonForConsultation: ['', Validators.required],
      currentIllness: ['', Validators.required],
      pastMedicalHistory: [''],
      familyHistory: [''],
      medications: [''],
      allergies: [''],
      dentalHistory: [''],
      extraoralExam: [''],
      intraoralExam: ['']
    });
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.isLoadingPage = true;
    Promise.all([
      this.loadPatient(),
      this.loadMedicalHistory()
    ]).then(() => {
      this.isLoadingPage = false;
    }).catch((error: any) => {
      this.isLoadingPage = false;
      this.errorMessage = 'Error al cargar datos';
      console.error('Error loading data', error);
    });
  }

  loadPatient(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.patientService.getPatientById(this.patientId)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { resolve(); })
        )
        .subscribe({
          next: (data: PatientResponse) => {
            this.patient = data;
          },
          error: (error: any) => {
            console.error('Error loading patient', error);
            reject(error);
          }
        });
    });
  }

  loadMedicalHistory(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.medicalHistoryService.getMedicalHistory(this.patientId)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { resolve(); })
        )
        .subscribe({
          next: (data: MedicalHistoryResponse | null) => {
            if (data) {
              this.medicalHistory = data;
              this.historyForm.patchValue(data);
            }
          },
          error: (error: any) => {
            console.error('Error loading medical history', error);
            reject(error);
          }
        });
    });
  }

  submitForm(): void {
    if (this.historyForm.valid) {
      this.isLoadingForm = true;
      this.errorMessage = '';
      this.medicalHistoryService.updateMedicalHistory(this.patientId, this.historyForm.value)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { this.isLoadingForm = false; })
        )
        .subscribe({
          next: (data: MedicalHistoryResponse) => {
            this.successMessage = 'Historia clínica actualizada exitosamente. Redirigiendo...';
            setTimeout(() => this.router.navigate(['/historiaclinica/list']), 1500);
          },
          error: (error: any) => {
            this.errorMessage = 'Error al actualizar historia clínica. Por favor intenta nuevamente.';
            console.error('Error updating medical history', error);
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/historiaclinica/list']);
  }
}
