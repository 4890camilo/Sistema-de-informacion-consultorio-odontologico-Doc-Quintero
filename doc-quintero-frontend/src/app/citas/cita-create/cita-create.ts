import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

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
  isLoadingForm = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    public router: Router
  ) {
    this.appointmentForm = this.fb.group({
      pacienteId: ['', Validators.required],
      odontologoId: ['default_doc', Validators.required],
      fechaHora: ['', Validators.required],
      duracionMinutos: [30, Validators.required],
      duracionBloque: [30, Validators.required],
      tipo: ['CONSULTA_GENERAL', Validators.required],
      notas: [''],
      comentarioInterno: [''],
      notificarPaciente: [true]
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
    this.patientService.getAllPatients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.patients = data,
        error: () => this.errorMessage = 'Error al cargar pacientes.'
      });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.isLoadingForm = true;
      this.appointmentService.createAppointment(this.appointmentForm.value)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.isLoadingForm = false)
        )
        .subscribe({
          next: () => this.router.navigate(['/citas/list']),
          error: () => this.errorMessage = 'Error al agendar la cita.'
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/citas/list']);
  }
}
