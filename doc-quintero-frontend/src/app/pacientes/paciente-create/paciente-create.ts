import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './paciente-create.html',
  styleUrl: './paciente-create.scss',
})
export class PacienteCreateComponent implements OnInit, OnDestroy {
  patientForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public router: Router
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

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.patientService.createPatient(this.patientForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: PatientResponse) => {
            this.successMessage = 'Paciente registrado exitosamente';
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['/pacientes/list']);
            }, 1500);
          },
          error: (error: any) => {
            this.isLoading = false;
            this.errorMessage = error?.error?.message || 'Error al registrar el paciente. Intenta de nuevo.';
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
