import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './paciente-edit.html',
  styleUrl: './paciente-edit.scss',
})
export class PacienteEditComponent implements OnInit, OnDestroy {
  patientForm: FormGroup;
  isLoading: boolean = false;
  isSaving: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  patientId: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.patientForm = this.fb.group({
      identificationNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.email]],
      address: [''],
      bloodType: [''],
      allergies: [''],
      chronicDiseases: [''],
      currentMedications: [''],
      insurance: [''],
      insuranceNumber: [''],
      emergencyContactName: [''],
      emergencyContactPhone: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: any) => {
      this.patientId = params['id'];
      if (this.patientId) {
        this.loadPatient();
      }
    });
  }

  loadPatient(): void {
    this.isLoading = true;
    this.patientService.getPatientById(this.patientId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (patient: PatientResponse) => {
          this.patientForm.patchValue(patient);
          this.isLoading = false;
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = 'Error al cargar el paciente';
        }
      });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.isSaving = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.patientService.updatePatient(this.patientId, this.patientForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: PatientResponse) => {
            this.successMessage = 'Paciente actualizado exitosamente';
            this.isSaving = false;
            setTimeout(() => {
              this.router.navigate(['/pacientes/list']);
            }, 1500);
          },
          error: (error: any) => {
            this.isSaving = false;
            this.errorMessage = error?.error?.message || 'Error al actualizar el paciente';
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/pacientes/list']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
