import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedicalHistoryService } from '../../services/medical-history.service';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { MedicalHistoryResponse } from '../../models/medical-history.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-historia-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './historia-create.html',
  styleUrl: './historia-create.scss',
})
export class HistoriaCreateComponent implements OnInit, OnDestroy {
  historyForm: FormGroup;
  patientId: string = '';
  patient: PatientResponse | null = null;
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
    this.loadPatient();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPatient(): void {
    this.isLoadingPage = true;
    this.patientService.getPatientById(this.patientId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: PatientResponse) => {
          this.patient = data;
          this.isLoadingPage = false;
        },
        error: (error: any) => {
          this.isLoadingPage = false;
          this.errorMessage = 'Error al cargar información del paciente';
          console.error('Error loading patient', error);
        }
      });
  }

  onSubmit(): void {
    if (this.historyForm.valid) {
      this.isLoadingForm = true;
      this.errorMessage = '';
      this.medicalHistoryService.createMedicalHistory(this.patientId, this.historyForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: MedicalHistoryResponse) => {
            this.successMessage = 'Historia clínica creada exitosamente. Redirigiendo...';
            setTimeout(() => this.router.navigate(['/historiaclinica/list']), 1500);
          },
          error: (error: any) => {
            this.isLoadingForm = false;
            this.errorMessage = 'Error al crear historia clínica. Por favor intenta nuevamente.';
            console.error('Error creating medical history', error);
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/historiaclinica/list']);
  }
}
