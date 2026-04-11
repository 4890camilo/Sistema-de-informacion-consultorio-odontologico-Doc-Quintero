import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentListItem } from '../../models/appointment.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-cita-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cita-list.html',
  styleUrl: './cita-list.scss',
})
export class CitaListComponent implements OnInit, OnDestroy {
  appointments: AppointmentListItem[] = [];
  filteredAppointments: AppointmentListItem[] = [];
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
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: AppointmentListItem[]) => {
          this.appointments = data;
          this.filteredAppointments = data;
          this.isLoading = false;
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = 'Error al cargar las citas';
        }
      });
  }

  filterAppointments(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredAppointments = this.appointments.filter((apt: AppointmentListItem) => {
      const patientName = apt.patientName?.toLowerCase() || '';
      return patientName.includes(query);
    });
  }

  editAppointment(id: string): void {
    this.router.navigate(['/citas/edit', id]);
  }

  deleteAppointment(id: string): void {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      // Future implementation for delete
      console.log('Delete appointment:', id);
    }
  }

  createAppointment(): void {
    this.router.navigate(['/citas/create']);
  }

  formatDate(dateString: string): string {
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
