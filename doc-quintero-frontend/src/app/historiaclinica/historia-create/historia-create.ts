import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedicalHistoryService } from '../../services/medical-history.service';
import { PatientService } from '../../services/patient.service';
import { PatientResponse } from '../../models/patient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-historia-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './historia-create.html',
  styleUrl: './historia-create.scss',
})
export class HistoriaCreateComponent implements OnInit, OnDestroy {
  historyForm: FormGroup;
  patientId: string = '';
  patient: PatientResponse | null = null;
  isLoadingPage = false;
  isLoadingForm = false;
  errorMessage = '';
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
    this.loadPatient();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPatient(): void {
    this.isLoadingPage = true;
    this.patientService.getPatientById(this.patientId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => { this.isLoadingPage = false; })
      )
      .subscribe({
        next: (data: PatientResponse) => {
          this.patient = data;
        },
        error: (error: any) => {
          this.errorMessage = 'Error al cargar información del paciente';
        }
      });
  }

  toggleEnfermedad(enfermedad: string): void {
    const control = this.historyForm.get('anamnesis.enfermedadesSistemicas');
    const current = control?.value as string[];
    if (current.includes(enfermedad)) {
      control?.setValue(current.filter(e => e !== enfermedad));
    } else {
      control?.setValue([...current, enfermedad]);
    }
  }

  onSubmit(): void {
    if (this.historyForm.valid) {
      this.isLoadingForm = true;
      this.errorMessage = '';
      
      const payload = {
        pacienteId: this.patientId,
        anamnesis: this.historyForm.value.anamnesis
      };

      this.medicalHistoryService.createMedicalHistory(payload)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => { this.isLoadingForm = false; })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/historiaclinica/list']);
          },
          error: (error: any) => {
            this.errorMessage = 'Error al guardar la historia clínica.';
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/historiaclinica/list']);
  }
}
