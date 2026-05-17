import { Component, OnInit, OnDestroy } from '@angular/core';
import { PacienteService, Patient } from '../paciente';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
 
@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente-list.html',
  styleUrl: './paciente-list.scss',
})
export class PacienteListComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  isLoading: boolean = false;
  searchQuery: string = '';
  errorMessage: string = '';
  deleteConfirm: { id: string; name: string } | null = null;
  private destroy$ = new Subject<void>();
 
  constructor(private pacienteService: PacienteService, private router: Router) {}
 
  ngOnInit(): void {
    this.loadPatients();
  }
 
  loadPatients(): void {
    this.isLoading = true;
    this.errorMessage = '';
 
    this.pacienteService.getPatients()
      .pipe(
        takeUntil(this.destroy$),
        // finalize() SIEMPRE corre al terminar el observable,
        // sin importar si fue éxito, error o cancelación.
        // Antes: si el error no disparaba, isLoading quedaba en true para siempre.
        finalize(() => { this.isLoading = false; })
      )
      .subscribe({
        next: (data) => {
          this.patients = data;
          this.filteredPatients = [...data];
        },
        error: () => {
          this.errorMessage = 'Error al cargar los pacientes. Intenta nuevamente.';
        }
      });
  }
 
  filterPatients(): void {
    if (!this.searchQuery.trim()) {
      this.filteredPatients = this.patients;
    } else {
      const query = this.searchQuery.trim().toLowerCase();
      this.filteredPatients = this.patients.filter(patient =>
        patient.firstName.toLowerCase().includes(query) ||
        patient.lastName.toLowerCase().includes(query) ||
        patient.identificationNumber.toLowerCase().includes(query) ||
        (patient.email && patient.email.toLowerCase().includes(query))
      );
    }
  }
 
  editPatient(id: string): void {
    this.router.navigate(['/pacientes/edit', id]);
  }
 
  confirmDelete(id: string, name: string): void {
    this.deleteConfirm = { id, name };
  }
 
  cancelDelete(): void {
    this.deleteConfirm = null;
  }
 
  deletePatient(id: string): void {
    this.pacienteService.deletePatient(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => { this.deleteConfirm = null; })
      )
      .subscribe({
        next: () => {
          this.loadPatients();
        },
        error: () => {
          this.errorMessage = 'Error al eliminar el paciente.';
        }
      });
  }
 
  createPatient(): void {
    this.router.navigate(['/pacientes/create']);
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}