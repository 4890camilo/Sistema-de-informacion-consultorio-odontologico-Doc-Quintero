import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../models/appointment.model';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-agenda-semanal',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agenda-semanal.html',
  styleUrls: ['./agenda-semanal.scss']
})
export class AgendaSemanalComponent implements OnInit, OnDestroy {
  vistaActual: 'semanal' | 'diaria' | 'lista' = 'semanal';
  fechaSeleccionada: Date = new Date();
  odontologoSeleccionado: string = 'todos';

  odontologos = [
    { id: 'todos', nombre: 'Todos los profesionales' },
    { id: 'default_doc', nombre: 'Dr. Quintero' },
    { id: 'dra_diaz', nombre: 'Dra. Diaz Albor' }
  ];

  diasSemana: { fechaStr: string; label: string; dateObj: Date }[] = [];
  intervalosHorarios: string[] = [];

  // Mapa de citas: clave 'YYYY-MM-DD_HH:mm' -> Cita[]
  citasMap: { [key: string]: AppointmentResponse[] } = {};
  allAppointments: AppointmentResponse[] = [];
  isLoading = false;
  errorMessage = '';

  selectedAppointment: AppointmentResponse | null = null;

  private destroy$ = new Subject<void>();

  constructor(private appointmentService: AppointmentService, public router: Router) {}

  ngOnInit() {
    this.generarIntervalosHorarios();
    this.generarDiasSemana();
    this.cargarCitas();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  generarIntervalosHorarios() {
    this.intervalosHorarios = [];
    for (let h = 8; h <= 19; h++) {
      for (let m of ['00', '15', '30', '45']) {
        const horaStr = `${h.toString().padStart(2, '0')}:${m}`;
        this.intervalosHorarios.push(horaStr);
      }
    }
  }

  generarDiasSemana() {
    this.diasSemana = [];
    const base = new Date(this.fechaSeleccionada);
    // Calcular lunes de la semana
    const dayOfWeek = base.getDay(); // 0 domingo, 1 lunes...
    const diff = base.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(base.getFullYear(), base.getMonth(), diff + i);
      const fechaStr = this.formatDateIso(d);
      const opciones: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
      const label = d.toLocaleDateString('es-CO', opciones);
      this.diasSemana.push({ fechaStr, label, dateObj: d });
    }
  }

  formatDateIso(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cargarCitas() {
    if (this.diasSemana.length === 0) return;
    const desde = this.diasSemana[0].fechaStr;
    const hasta = this.diasSemana[6].fechaStr;

    this.isLoading = true;
    this.errorMessage = '';

    this.appointmentService.getAllAppointments()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (citas: AppointmentResponse[]) => {
          this.allAppointments = citas || [];
          this.organizarCitas();
        },
        error: (err) => {
          console.error('Error cargando citas de agenda:', err);
          this.errorMessage = 'No se pudieron sincronizar las citas de la agenda.';
        }
      });
  }

  organizarCitas() {
    this.citasMap = {};
    for (const cita of this.allAppointments) {
      if (this.odontologoSeleccionado !== 'todos' && cita.odontologoId && cita.odontologoId !== this.odontologoSeleccionado) {
        continue;
      }

      if (cita.fechaHora) {
        // Formato esperado: YYYY-MM-DDTHH:mm:ss o similar
        const fechaHoraStr = cita.fechaHora.replace(' ', 'T');
        const [fecha, horaCompleta] = fechaHoraStr.split('T');
        if (fecha && horaCompleta) {
          const horaMin = horaCompleta.substring(0, 5); // HH:mm
          const key = `${fecha}_${horaMin}`;
          if (!this.citasMap[key]) {
            this.citasMap[key] = [];
          }
          this.citasMap[key].push(cita);
        }
      }
    }
  }

  getCitasEnSlot(fechaStr: string, hora: string): AppointmentResponse[] {
    const key = `${fechaStr}_${hora}`;
    return this.citasMap[key] || [];
  }

  semanaAnterior() {
    this.fechaSeleccionada = new Date(this.fechaSeleccionada.getTime() - 7 * 24 * 60 * 60 * 1000);
    this.generarDiasSemana();
    this.cargarCitas();
  }

  semanaSiguiente() {
    this.fechaSeleccionada = new Date(this.fechaSeleccionada.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.generarDiasSemana();
    this.cargarCitas();
  }

  diaAnterior() {
    this.fechaSeleccionada = new Date(this.fechaSeleccionada.getTime() - 24 * 60 * 60 * 1000);
    this.generarDiasSemana();
    this.cargarCitas();
  }

  diaSiguiente() {
    this.fechaSeleccionada = new Date(this.fechaSeleccionada.getTime() + 24 * 60 * 60 * 1000);
    this.generarDiasSemana();
    this.cargarCitas();
  }

  hoy() {
    this.fechaSeleccionada = new Date();
    this.generarDiasSemana();
    this.cargarCitas();
  }

  cambiarOdontologo() {
    this.organizarCitas();
  }

  nuevaCita(fecha: string, hora: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.router.navigate(['/citas/create'], { queryParams: { fecha, hora } });
  }

  verCitaDetalle(cita: AppointmentResponse, event: Event) {
    event.stopPropagation();
    this.selectedAppointment = cita;
  }

  cerrarModal() {
    this.selectedAppointment = null;
  }

  reprogramarCita(id: string) {
    this.cerrarModal();
    this.router.navigate(['/citas/edit', id]);
  }

  cancelarCita(id: string) {
    if (confirm('¿Desea anular esta cita médica?')) {
      this.appointmentService.cancelAppointment(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.cerrarModal();
            this.cargarCitas();
          },
          error: (err) => console.error('Error cancelando cita:', err)
        });
    }
  }

  irHistoriaClinica(pacienteId?: string) {
    this.cerrarModal();
    if (pacienteId) {
      this.router.navigate(['/historiaclinica/edit', pacienteId]);
    } else {
      this.router.navigate(['/historiaclinica/list']);
    }
  }

  getTituloRango(): string {
    if (this.vistaActual === 'diaria') {
      const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return this.fechaSeleccionada.toLocaleDateString('es-CO', opciones);
    }
    if (this.diasSemana.length === 7) {
      const f1 = this.diasSemana[0].label;
      const f2 = this.diasSemana[6].label;
      return `${f1} — ${f2}, ${this.fechaSeleccionada.getFullYear()}`;
    }
    return '';
  }

  getFechaActualStr(): string {
    return this.formatDateIso(this.fechaSeleccionada);
  }
}
