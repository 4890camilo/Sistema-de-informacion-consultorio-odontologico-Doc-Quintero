import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../models/appointment.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cita-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cita-edit.html',
  styleUrl: './cita-edit.scss',
})
export class CitaEditComponent implements OnInit, OnDestroy {
  rescheduleForm: FormGroup;
  appointmentId: string = '';
  appointment: AppointmentResponse | null = null;
  isLoadingPage = false;
  isLoadingForm = false;
  errorMessage = '';
  successMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.rescheduleForm = this.fb.group({
      newDateTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('id')!;
    this.loadAppointment();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAppointment(): void {
    this.isLoadingPage = true;
    this.appointmentService.getAllAppointments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (appointments: any[]) => {
          this.appointment = appointments.find(a => a.id === this.appointmentId) || null;
          if (this.appointment) {
            this.rescheduleForm.patchValue({ newDateTime: this.appointment.dateTime });
          }
          this.isLoadingPage = false;
        },
        error: (error: any) => {
          this.isLoadingPage = false;
          this.errorMessage = 'Error al cargar la cita. Por favor intenta nuevamente.';
          console.error('Error loading appointment', error);
        }
      });
  }

  onSubmit(): void {
    if (this.rescheduleForm.valid) {
      this.isLoadingForm = true;
      this.errorMessage = '';
      this.appointmentService.rescheduleAppointment(this.appointmentId, this.rescheduleForm.value.newDateTime)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.successMessage = 'Cita reprogramada exitosamente. Redirigiendo...';
            setTimeout(() => this.router.navigate(['/citas/list']), 1500);
          },
          error: (error: any) => {
            this.isLoadingForm = false;
            this.errorMessage = 'Error al reprogramar la cita. Por favor intenta nuevamente.';
            console.error('Error rescheduling appointment', error);
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/citas/list']);
  }
}
