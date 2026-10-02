import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../models/appointment.model';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-cita-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cita-list.html',
  styleUrl: './cita-list.scss',
})
export class CitaListComponent implements OnInit, OnDestroy {
  appointments: AppointmentResponse[] = [];
  filteredAppointments: AppointmentResponse[] = [];
  isLoading: boolean = false;
  searchQuery: string = '';
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(private appointmentService: AppointmentService, public router: Router) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.appointmentService.getAllAppointments()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => { this.isLoading = false; })
      )
      .subscribe({
        next: (data: AppointmentResponse[]) => {
          this.appointments = data;
          this.filteredAppointments = data;
        },
        error: (error: any) => {
          this.errorMessage = 'Error al cargar las citas';
        }
      });
  }

  filterAppointments(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredAppointments = this.appointments.filter((apt: AppointmentResponse) => {
      const patientName = apt.patientName?.toLowerCase() || '';
      return patientName.includes(query);
    });
  }

  openHistoriaClinica(pacienteId?: string): void {
    if (pacienteId) {
      this.router.navigate(['/historiaclinica/edit', pacienteId]);
    } else {
      this.router.navigate(['/historiaclinica/list']);
    }
  }

  editAppointment(id: string): void {
    this.router.navigate(['/citas/edit', id]);
  }

  deleteAppointment(id: string): void {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      this.appointmentService.cancelAppointment(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.loadAppointments(),
          error: (err) => console.error('Error cancelando cita:', err)
        });
    }
  }

  createAppointment(): void {
    this.router.navigate(['/citas/create']);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
