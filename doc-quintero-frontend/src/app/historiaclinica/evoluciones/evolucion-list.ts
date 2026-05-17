import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Evolucion {
  fecha: string;
  profesional: string;
  procedimiento: string;
  detalle: string;
  materiales: string;
  estado: 'Activa' | 'Anulada';
}

@Component({
  selector: 'app-evolucion-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="evoluciones-container">
      <div class="evolucion-card" *ngFor="let ev of evoluciones" [class.anulada]="ev.estado === 'Anulada'">
        <div class="ev-header">
          <span class="ev-date">{{ ev.fecha | date:'medium' }}</span>
          <span class="ev-profesional">{{ ev.profesional }}</span>
          <span class="badge" [class.badge-error]="ev.estado === 'Anulada'">{{ ev.estado }}</span>
        </div>
        <div class="ev-body">
          <p><strong>Procedimiento:</strong> {{ ev.procedimiento }}</p>
          <p>{{ ev.detalle }}</p>
          <div class="ev-footer" *ngIf="ev.materiales">
            <small>Materiales: {{ ev.materiales }}</small>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .evoluciones-container { display: flex; flex-direction: column; gap: 1rem; }
    .evolucion-card {
      background: white;
      border-left: 4px solid var(--teal-mid);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      &.anulada { border-left-color: var(--error); opacity: 0.7; }
    }
    .ev-header { display: flex; justify-content: space-between; margin-bottom: 1rem; font-weight: 600; }
    .ev-date { color: var(--teal-deep); }
    .ev-profesional { color: var(--text-muted); }
    .badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; background: #e6fffa; color: #2c7a7b; }
    .badge-error { background: #fff5f5; color: #c53030; }
    .ev-body p { margin: 0.5rem 0; }
    .ev-footer { margin-top: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border); color: var(--text-muted); }
  `]
})
export class EvolucionListComponent {
  @Input() evoluciones: Evolucion[] = [
    { fecha: new Date().toISOString(), profesional: 'Dra. Quintero', procedimiento: 'Resina Oclusal 16', detalle: 'Se realiza cavidad clase I, grabado ácido y adhesivo. Resina Z350.', materiales: 'Resina 3M, Adhesivo Singlebond', estado: 'Activa' }
  ];
}
