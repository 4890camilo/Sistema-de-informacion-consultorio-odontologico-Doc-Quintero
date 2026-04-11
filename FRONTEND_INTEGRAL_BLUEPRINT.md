# DOCUMENTO INTEGRAL - DESARROLLO FRONTEND DOC QUINTERO

## INSTRUCCIONES PARA CLAUDE

Soy desarrollador del proyecto Doc Quintero (consultorio médico). He completado:
- ✅ Backend Spring Boot (APIs funcionando)
- ✅ Módulo Auth (login/register - diseño listo)
- ✅ Modelos TypeScript e interfaces
- ✅ Servicios base
- ✅ Módulo Pacientes 90% completo

**NECESITO**: Que completes el frontend correctamente, siguiendo EXACTAMENTE el patrón del módulo Auth y Pacientes que adjunto.

---

## ESTRUCTURA Y PATRONES

### 1. COLORES Y ESTILOS (CONSISTENTES EN TODO)
```scss
$teal-deep:    #0a4a4a;
$teal-mid:     #0d6b6b;
$teal-light:   #19a8a8;
$error:        #d94a4a;
$success:      #2d8659;
$text-primary: #1a2e2e;
$text-muted:   #6b8c8c;
```

### 2. ESTRUCTURA DE CARPETAS
```
src/app/
├── auth/            (✅ HECHO)
├── pacientes/       (✅ 90% HECHO)
│   ├── paciente.ts (servicio)
│   ├── pacientes-shared.scss
│   ├── paciente-create/ (formulario bonito)
│   ├── paciente-edit/
│   └── paciente-list/ (tabla con búsqueda)
├── citas/           (⏳ FALTA)
│   ├── cita.ts (servicio)
│   ├── citas-shared.scss
│   ├── cita-create/
│   ├── cita-edit/
│   └── cita-list/
├── historiaclinica/ (⏳ FALTA)
│   ├── historia.ts (servicio)
│   ├── historiaclinica-shared.scss
│   ├── historia-create/
│   ├── historia-edit/
│   └── historia-list/
└── reportes/        (⏳ FALTA)
    ├── reporte.ts (servicio)
    └── reporte-list/
```

### 3. PATRÓN DE COMPONENTE (EJEMPLO: PACIENTE-LIST)

**servicios/patient.service.ts** - YA EXISTE
```typescript
// getAllPatients(): Observable<PatientResponse[]>
// getPatientById(id): Observable<PatientResponse>
// createPatient(patient): Observable<PatientResponse>
// updatePatient(id, patient): Observable<PatientResponse>
// deletePatient(id): Observable<any>
```

**paciente-list.ts** - SOLO COMO REFERENCIA
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PacienteService, Patient } from '../paciente';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente-list.html',
  styleUrl: '../pacientes-shared.scss',
})
export class PacienteListComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  isLoading: boolean = false;
  searchQuery: string = '';
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(private pacienteService: PacienteService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading = true;
    this.pacienteService.getPatients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.patients = data;
          this.filteredPatients = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Error al cargar';
        }
      });
  }

  filterPatients(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredPatients = this.patients.filter(p =>
      p.firstName.includes(query) || 
      p.lastName.includes(query) ||
      p.identificationNumber.includes(query)
    );
  }

  editPatient(id: string): void {
    this.router.navigate(['/pacientes/edit', id]);
  }

  deletePatient(id: string): void {
    if (confirm('¿Eliminar?')) {
      this.pacienteService.deletePatient(id).subscribe({
        next: () => this.loadPatients()
      });
    }
  }

  createPatient(): void {
    this.router.navigate(['/pacientes/create']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**paciente-list.html** - CON ESTILOS INTEGRADOS
```html
<div class="page-container">
  <div class="page-header">
    <h1>Pacientes</h1>
    <p>Gestiona el listado de pacientes</p>
  </div>

  <div class="alert alert-error" *ngIf="errorMessage">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/>
      <path d="M8 5v3.5M8 11h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    {{ errorMessage }}
  </div>

  <div class="list-container">
    <div class="list-header">
      <div class="search-box">
        <svg viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M14 14l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <input [(ngModel)]="searchQuery" (input)="filterPatients()" placeholder="Buscar...">
      </div>
      <button class="btn btn-primary" (click)="createPatient()">Nuevo</button>
    </div>

    <div class="loading-spinner" *ngIf="isLoading">
      <div class="spinner"></div>
      <p>Cargando...</p>
    </div>

    <table class="data-table" *ngIf="filteredPatients.length > 0 && !isLoading">
      <thead>
        <tr>
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of filteredPatients">
          <td><span class="badge">{{ p.identificationNumber }}</span></td>
          <td>{{ p.firstName }} {{ p.lastName }}</td>
          <td>{{ p.email || '-' }}</td>
          <td>{{ p.phone || '-' }}</td>
          <td>
            <button class="btn-edit" (click)="editPatient(p.id)">Editar</button>
            <button class="btn-delete" (click)="deletePatient(p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="empty-state" *ngIf="filteredPatients.length === 0 && !isLoading">
      <h3>{{ searchQuery ? 'Sin resultados' : 'No hay pacientes' }}</h3>
      <button class="btn btn-primary" (click)="createPatient()" *ngIf="!searchQuery">Crear Paciente</button>
    </div>
  </div>
</div>
```

**paciente-list.scss**
```scss
@import '../pacientes-shared.scss';
```

---

## COMPONENTES A COMPLETAR

### MÓDULO CITAS

**1. cita-list.html** - Tabla similar a paciente-list pero con:
- Columnas: Paciente | Fecha/Hora | Tipo | Estado | Acciones
- Filtros: Por paciente, por estado (Programada/Completada/Cancelada)
- Botones: Editar, Cancelar

**2. cita-create.html** - Formulario con campos:
- Seleccionar Paciente (dropdown)
- Fecha y Hora (datetime)
- Tipo (Select: Emergencia/Rutina/Seguimiento)
- Notas (textarea)

**3. cita-edit.html** - Similar a create pero editando cita existente

**4. Services relacionados**:
- AppointmentService (CREAR si no existe)
- PatientService (ya existe)

---

### MÓDULO HISTORIA CLÍNICA

**1. historia-list.html** - Tabla con:
- Columnas: Paciente | Diagnóstico | Fecha | Acciones
- Búsqueda por paciente
- Botón: Nueva Historia, Editar, Ver

**2. historia-create.html** - Formulario con:
- Seleccionar Paciente
- Diagnóstico (textarea)
- Tratamiento (textarea)
- Notas (textarea)
- Estado de dientes (tabla visual opcional)

**3. historia-edit.html** - Similar a create

---

### MÓDULO REPORTES

**1. reporte-list.html** - Dashboard con:
- Filtros: Rango de fechas (desde-hasta)
- Estadísticas: Total citas, Completadas, Canceladas
- Tabla: Listado de citas en rango
- Botón: Descargar como PDF/Excel

---

## REQUERIMIENTOS FUNCIONALES

✅ Todos los componentes deben:
1. Tener validación de formularios (campo requerido, email válido, etc)
2. Mostrar mensajes de error/éxito
3. Soporte para búsqueda/filtrado
4. Spinners de carga
5. Confirmación antes de eliminar
6. Estados de deshabilitación (cuando está guardando)
7. Unsubscribe automático en ngOnDestroy
8. Diseño responsive (mobile-first)
9. Colores y tipografía consistentes con Auth
10. Iconos SVG consistentes

---

## PRÓXIMOS PASOS

1. Completa los componentes de Citas (create, edit, list)
2. Completa los componentes de Historia Clínica
3. Crea el módulo de Reportes
4. Configura el routing en app.routes.ts
5. Prueba toda la aplicación

¿Listo para empezar?
