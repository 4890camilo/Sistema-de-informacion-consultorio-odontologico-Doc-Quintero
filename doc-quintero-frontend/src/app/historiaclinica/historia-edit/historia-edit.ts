import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedicalHistoryService } from '../../services/medical-history.service';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { MedicalHistoryResponse } from '../../models/medical-history.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { PatientHeaderComponent } from '../patient-header/patient-header';
import { OdontogramaInteractiveComponent } from '../odontograma-interactive/odontograma-interactive';

@Component({
  selector: 'app-historia-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PatientHeaderComponent, OdontogramaInteractiveComponent],
  templateUrl: './historia-edit.html',
  styleUrl: './historia-edit.scss',
})
export class HistoriaEditComponent implements OnInit, OnDestroy {
  historyForm: FormGroup;
  patientId: string = '';
  patient: PatientResponse | null = null;
  medicalHistory: MedicalHistoryResponse | null = null;
  isLoadingPage = false;
  isLoadingForm = false;
  errorMessage = '';
  successMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private medicalHistoryService: MedicalHistoryService,
    private patientService: PatientService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.historyForm = this.fb.group({
      anamnesis: this.fb.group({
        motivoConsulta: ['', Validators.required],
        enTratamientoMedico: [false],
        detalleTratamiento: [''],
        medicamentos: [''],
        alergias: [''],
        enfermedadesSistemicas: [[]],
        habitos: [[]],
        antecedentesQuirurgicos: [''],
        antecedentesOdontologicos: [''],
        embarazo: [false],
        alertasMedicas: [''],
        comentarios: ['']
      })
    });
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.isLoadingPage = true;
    this.errorMessage = '';
    Promise.all([
      this.loadPatient(),
      this.loadMedicalHistory()
    ]).then(() => {
      this.isLoadingPage = false;
    }).catch((error: any) => {
      this.isLoadingPage = false;
      console.error('Error loading data', error);
    });
  }

  loadPatient(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.patientService.getPatientById(this.patientId)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { resolve(); })
        )
        .subscribe({
          next: (data: PatientResponse) => {
            this.patient = data;
          },
          error: (error: any) => {
            console.error('Error loading patient', error);
            this.errorMessage = 'Error al cargar información del paciente';
            reject(error);
          }
        });
    });
  }

  loadMedicalHistory(): Promise<void> {
    return new Promise((resolve) => {
      this.medicalHistoryService.getMedicalHistory(this.patientId)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { resolve(); })
        )
        .subscribe({
          next: (data: MedicalHistoryResponse | null) => {
            if (data && data.anamnesis) {
              this.medicalHistory = data;
              this.historyForm.patchValue({
                anamnesis: data.anamnesis
              });
            }
          },
          error: (error: any) => {
            console.log('Paciente sin historia clínica previa registrada aún. Se creará al guardar.');
            this.medicalHistory = null;
          }
        });
    });
  }

  toggleEnfermedad(enfermedad: string): void {
    const control = this.historyForm.get('anamnesis.enfermedadesSistemicas');
    const current = (control?.value as string[]) || [];
    if (current.includes(enfermedad)) {
      control?.setValue(current.filter(e => e !== enfermedad));
    } else {
      control?.setValue([...current, enfermedad]);
    }
  }

  isEnfermedadChecked(enfermedad: string): boolean {
    const current = (this.historyForm.get('anamnesis.enfermedadesSistemicas')?.value as string[]) || [];
    return current.includes(enfermedad);
  }

  submitForm(): void {
    if (this.historyForm.valid) {
      this.isLoadingForm = true;
      this.errorMessage = '';
      const formVal = this.historyForm.value;

      const payload = {
        pacienteId: this.patientId,
        anamnesis: formVal.anamnesis
      };

      const request$ = this.medicalHistory && this.medicalHistory.id
        ? this.medicalHistoryService.updateMedicalHistory(this.medicalHistory.id, payload)
        : this.medicalHistoryService.createMedicalHistory(payload);

      request$
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { this.isLoadingForm = false; })
        )
        .subscribe({
          next: (data: MedicalHistoryResponse) => {
            this.medicalHistory = data;
            this.successMessage = 'Historia clínica guardada exitosamente. Redirigiendo...';
            setTimeout(() => this.router.navigate(['/historiaclinica/list']), 1200);
          },
          error: (error: any) => {
            this.errorMessage = 'Error al guardar la historia clínica. Por favor intenta nuevamente.';
            console.error('Error saving medical history', error);
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/historiaclinica/list']);
  }
}
