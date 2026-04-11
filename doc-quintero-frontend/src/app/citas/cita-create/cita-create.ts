import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentRequest, AppointmentResponse } from '../../models/appointment.model';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cita-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cita-create.html',
  styleUrl: './cita-create.scss',
  standalone: true
})
export class CitaCreateComponent implements OnInit, OnDestroy {
  appointmentForm: FormGroup;
  patients: PatientResponse[] = [];
  isLoadingPage = false;
  isLoadingForm = false;
  errorMessage = '';
  successMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    public router: Router
  ) {
    this.appointmentForm = this.fb.group({
      patientId: ['', Validators.required],
      dateTime: ['', Validators.required],
      type: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPatients(): void {
    this.isLoadingPage = true;
    this.patientService.getAllPatients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.patients = data;
          this.isLoadingPage = false;
        },
        error: (error) => {
          this.isLoadingPage = false;
          this.errorMessage = 'Error al cargar pacientes. Por favor intenta nuevamente.';
          console.error('Error loading patients', error);
        }
      });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.isLoadingForm = true;
      this.errorMessage = '';
      this.appointmentService.createAppointment(this.appointmentForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.successMessage = 'Cita agendada exitosamente. Redirigiendo...';
            setTimeout(() => this.router.navigate(['/citas/list']), 1500);
          },
          error: (error) => {
            this.isLoadingForm = false;
            this.errorMessage = 'Error al crear la cita. Por favor intenta nuevamente.';
            console.error('Error creating appointment', error);
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/citas/list']);
  }
}
