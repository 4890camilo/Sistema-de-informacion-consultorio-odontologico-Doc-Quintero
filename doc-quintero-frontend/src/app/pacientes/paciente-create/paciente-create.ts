import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

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
  activeTab: string = 'basicos';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public router: Router
  ) {
    this.patientForm = this.fb.group({
      // Identidad
      identificationNumber: ['', Validators.required],
      tipoDocumento: ['CC', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nombreSocial: [''],
      birthDate: [''],
      sexo: ['Otro'],
      genero: [''],
      
      // Contacto
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      telefonoFijo: [''],
      address: [''],
      ciudad: [''],
      departamento: [''],
      
      // Adicionales
      ocupacion: [''],
      empleador: [''],
      tipoPaciente: ['Particular'],
      comoNosConocio: [''],
      insurance: [''],
      insuranceNumber: [''],
      observaciones: [''],
      
      // Acudiente
      acudiente: this.fb.group({
        nombre: [''],
        identificacion: [''],
        parentesco: [''],
        telefono: ['']
      })
    });
  }

  ngOnInit(): void {}

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.patientService.createPatient(this.patientForm.value)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { this.isLoading = false; })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/pacientes/list']);
          },
          error: (error: any) => {
            this.errorMessage = error?.error?.message || 'Error al registrar el paciente.';
          }
        });
    } else {
      this.errorMessage = 'Por favor completa los campos obligatorios (*)';
      this.markFormGroupTouched(this.patientForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/pacientes/list']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
