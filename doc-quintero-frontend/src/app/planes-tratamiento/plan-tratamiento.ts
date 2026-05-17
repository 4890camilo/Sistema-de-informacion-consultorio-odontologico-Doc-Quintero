import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { TratamientoService } from '../services/tratamiento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plan-tratamiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './plan-tratamiento.html',
  styleUrl: './plan-tratamiento.scss'
})
export class PlanTratamientoComponent implements OnInit {
  planForm: FormGroup;
  pacienteId: string = '';
  isLoading = false;

  procedimientosDisponibles = [
    { codigo: '001', nombre: 'Limpieza Dental', valor: 80000 },
    { codigo: '002', nombre: 'Resina Fotocurado', valor: 120000 },
    { codigo: '003', nombre: 'Extracción Simple', valor: 90000 },
    { codigo: '004', nombre: 'Blanqueamiento', valor: 350000 },
    { codigo: '005', nombre: 'Endodoncia Unirradicular', valor: 450000 }
  ];

  constructor(
    private fb: FormBuilder,
    private tratamientoService: TratamientoService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.planForm = this.fb.group({
      nombre: ['Plan de Tratamiento Inicial', Validators.required],
      prestaciones: this.fb.array([]),
      descuento: [0],
      totalFinal: [0]
    });
  }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('pacienteId') || '';
    this.addPrestacion(); // Iniciar con una fila vacía
  }

  get prestaciones() {
    return this.planForm.get('prestaciones') as FormArray;
  }

  addPrestacion() {
    const item = this.fb.group({
      codigo: ['', Validators.required],
      nombre: [''],
      valor: [0, Validators.required],
      observaciones: ['']
    });
    this.prestaciones.push(item);
  }

  removePrestacion(index: number) {
    this.prestaciones.removeAt(index);
    this.calcularTotal();
  }

  onProcedimientoChange(index: number) {
    const control = this.prestaciones.at(index);
    const selected = this.procedimientosDisponibles.find(p => p.codigo === control.get('codigo')?.value);
    if (selected) {
      control.patchValue({
        nombre: selected.nombre,
        valor: selected.valor
      });
    }
    this.calcularTotal();
  }

  calcularTotal() {
    let subtotal = 0;
    this.prestaciones.controls.forEach(c => {
      subtotal += c.get('valor')?.value || 0;
    });
    const descuento = this.planForm.get('descuento')?.value || 0;
    this.planForm.patchValue({ totalFinal: subtotal - descuento }, { emitEvent: false });
  }

  onSubmit() {
    if (this.planForm.valid) {
      this.isLoading = true;
      const data = {
        ...this.planForm.value,
        pacienteId: this.pacienteId,
        presupuestoTotal: this.planForm.value.totalFinal + this.planForm.value.descuento
      };
      
      this.tratamientoService.createTratamiento(data).subscribe({
        next: () => this.router.navigate(['/pacientes/list']),
        error: () => this.isLoading = false
      });
    }
  }
}
