import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

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
  patientId: string = '';
  activeTab: string = 'basicos';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.patientForm = this.fb.group({
      // Identidad
      identificationNumber: [{ value: '', disabled: true }],
      tipoDocumento: ['CC', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nombreSocial: [''],
      birthDate: [{ value: '', disabled: true }],
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

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: any) => {
      this.patientId = params['id'];
      if (this.patientId) this.loadPatient();
    });
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  loadPatient(): void {
    this.isLoading = true;
    this.patientService.getPatientById(this.patientId)
      .pipe(takeUntil(this.destroy$), finalize(() => this.isLoading = false))
      .subscribe({
        next: (patient: PatientResponse) => {
          this.patientForm.patchValue(patient);
        },
        error: () => this.errorMessage = 'Error al cargar el paciente.'
      });
  }

  onSubmit(): void {
    if (this.patientForm.invalid) return;

    this.isSaving = true;
    this.patientService.updatePatient(this.patientId, this.patientForm.getRawValue())
      .pipe(takeUntil(this.destroy$), finalize(() => this.isSaving = false))
      .subscribe({
        next: () => this.router.navigate(['/pacientes/list']),
        error: (error: any) => this.errorMessage = error?.error?.message || 'Error al actualizar el paciente'
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