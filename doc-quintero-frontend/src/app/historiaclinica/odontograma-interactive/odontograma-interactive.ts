import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OdontogramaService } from '../../services/odontograma.service';
import {
  PiezaDental,
  CondicionDental,
  OdontogramaResponse,
  CATALOGO_CIE10_DENTAL,
  CATALOGO_CUPS_ODONTOLOGICO,
  Cie10Item,
  CupsItem
} from '../../models/odontograma.model';

export interface SuperficiesPieza {
  vestibular?: string;
  lingualPalatina?: string;
  mesial?: string;
  distal?: string;
  oclusalIncisal?: string;
  condicionGeneral?: string;
}

export interface PiezaDentalState {
  numeroPieza: number;
  superficies: SuperficiesPieza;
  condicion: CondicionDental;
  codigoCie10?: string;
  descripcionCie10?: string;
  codigoCups?: string;
  descripcionCups?: string;
  notas?: string;
}

export type TipoDiente = 'molar' | 'premolar' | 'canino' | 'incisivo';

@Component({
  standalone: true,
  selector: 'app-odontograma-interactive',
  imports: [CommonModule, FormsModule],
  templateUrl: './odontograma-interactive.html',
  styleUrls: ['./odontograma-interactive.scss']
})
export class OdontogramaInteractiveComponent implements OnInit, OnChanges {
  @Input() historiaClinicaId!: string;
  @Output() guardarOdontograma = new EventEmitter<any>();

  tipoDenticion: 'permanente' | 'temporal' = 'permanente';
  modoVista: 'diagnostico' | 'informacion' | 'cie10' = 'diagnostico';
  versionActual: string = 'Versión 1';
  versionesDisponibles: OdontogramaResponse[] = [];
  
  piezasSeleccionadas: number[] = [];
  piezasEstado: Map<number, PiezaDentalState> = new Map();

  // Modales
  modalDiagnosticoAbierto: boolean = false;
  pasoModal: 'condicion' | 'cie10' | 'cups' = 'condicion';
  diagnosticoSeleccionadoTemp: any = null;

  // Catálogo CIE-10
  catalogoCie10: Cie10Item[] = CATALOGO_CIE10_DENTAL;
  cie10Filtro: string = '';
  cie10Seleccionado: Cie10Item | null = null;

  // Catálogo CUPS (Colombia)
  catalogoCups: CupsItem[] = CATALOGO_CUPS_ODONTOLOGICO;
  cupsFiltro: string = '';
  cupsSeleccionado: CupsItem | null = null;

  // Indicadores de carga y guardado
  isSaving: boolean = false;
  isLoading: boolean = false;
  mensajeEstado: string = '';

  // FDI Numeración Permanente
  cuadrante1 = [18, 17, 16, 15, 14, 13, 12, 11]; // Sup Der
  cuadrante2 = [21, 22, 23, 24, 25, 26, 27, 28]; // Sup Izq
  cuadrante4 = [48, 47, 46, 45, 44, 43, 42, 41]; // Inf Der
  cuadrante3 = [31, 32, 33, 34, 35, 36, 37, 38]; // Inf Izq

  // FDI Numeración Temporal (Decidua)
  cuadrante5 = [55, 54, 53, 52, 51];
  cuadrante6 = [61, 62, 63, 64, 65];
  cuadrante8 = [85, 84, 83, 82, 81];
  cuadrante7 = [71, 72, 73, 74, 75];

  // Opciones de Diagnóstico con sugerencias predeterminadas CIE-10 y CUPS
  opcionesDiagnostico = [
    { id: 'CARIES', label: 'Caries (Pendiente)', color: '#e74c3c', type: 'superficie', defaultCie10: 'K02.1', defaultCups: '232101' },
    { id: 'RESTAURACION', label: 'Restauración Resina (Buen estado)', color: '#27ae60', type: 'superficie', defaultCie10: 'Z01.2', defaultCups: '232101' },
    { id: 'RESTAURACION_MAL_ESTADO', label: 'Restauración (Mal estado)', color: '#e67e22', type: 'superficie', defaultCie10: 'K02.8', defaultCups: '232102' },
    { id: 'AMALGAMA', label: 'Amalgama (Buen estado)', color: '#2980b9', type: 'superficie', defaultCie10: 'Z01.2', defaultCups: '232103' },
    { id: 'AMALGAMA_MAL_ESTADO', label: 'Amalgama (Mal estado)', color: '#d35400', type: 'superficie', defaultCie10: 'K02.8', defaultCups: '232102' },
    { id: 'SELLANTE', label: 'Sellante Fosas y Fisuras', color: '#8e44ad', type: 'superficie', defaultCie10: 'Z01.2', defaultCups: '997301' },
    { id: 'CORONA', label: 'Corona Definitiva', color: '#3498db', type: 'pieza', defaultCie10: 'Z01.2', defaultCups: '234102' },
    { id: 'CORONA_PROVISORIA', label: 'Corona Provisoria', color: '#f39c12', type: 'pieza', defaultCie10: 'Z01.2', defaultCups: '234101' },
    { id: 'PERNO_MUNON', label: 'Perno Muñón', color: '#16a085', type: 'pieza', defaultCie10: 'Z01.2', defaultCups: '234201' },
    { id: 'ENDODONCIA', label: 'Tratamiento de Conducto (Endodoncia)', color: '#9b59b6', type: 'pieza', defaultCie10: 'K04.0', defaultCups: '237101' },
    { id: 'IMPLANTE', label: 'Implante Dental', color: '#2c3e50', type: 'pieza', defaultCie10: 'Z01.2', defaultCups: '235101' },
    { id: 'AUSENTE', label: 'Pieza Ausente', color: '#7f8c8d', type: 'pieza', defaultCie10: 'K08.1', defaultCups: '893101' },
    { id: 'EXTRACCION_INDICADA', label: 'Extracción Indicada', color: '#c0392b', type: 'pieza', defaultCie10: 'K04.1', defaultCups: '230101' },
    { id: 'FRACTURA', label: 'Fractura Dental / Traumatismo', color: '#e84393', type: 'pieza', defaultCie10: 'K03.81', defaultCups: '232102' }
  ];

  constructor(private odontogramaService: OdontogramaService) {}

  ngOnInit() {
    this.inicializarOdontograma();
    if (this.historiaClinicaId) {
      this.cargarDesdeBackend();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['historiaClinicaId'] && !changes['historiaClinicaId'].isFirstChange()) {
      if (this.historiaClinicaId) {
        this.cargarDesdeBackend();
      }
    }
  }

  inicializarOdontograma() {
    const todasLasPiezas = [
      ...this.cuadrante1, ...this.cuadrante2,
      ...this.cuadrante4, ...this.cuadrante3,
      ...this.cuadrante5, ...this.cuadrante6,
      ...this.cuadrante8, ...this.cuadrante7
    ];
    this.piezasEstado.clear();
    todasLasPiezas.forEach(num => {
      this.piezasEstado.set(num, {
        numeroPieza: num,
        superficies: {},
        condicion: 'SANO',
        codigoCie10: '',
        descripcionCie10: '',
        codigoCups: '',
        descripcionCups: ''
      });
    });
  }

  cargarDesdeBackend() {
    if (!this.historiaClinicaId) return;
    this.isLoading = true;
    this.odontogramaService.getOdontogramaActual(this.historiaClinicaId).subscribe({
      next: (resp: OdontogramaResponse | null) => {
        this.isLoading = false;
        if (resp && resp.piezas && resp.piezas.length > 0) {
          this.versionActual = `Versión ${resp.version || 1} (${new Date(resp.fechaRegistro).toLocaleDateString('es-CO')})`;
          resp.piezas.forEach(p => {
            const num = p.numeroPieza;
            const estadoActual = this.piezasEstado.get(num) || {
              numeroPieza: num,
              superficies: {},
              condicion: 'SANO'
            };
            estadoActual.condicion = p.condicion || 'SANO';
            estadoActual.codigoCie10 = p.codigoCie10 || '';
            estadoActual.descripcionCie10 = p.descripcionCie10 || '';
            estadoActual.codigoCups = p.codigoCups || '';
            estadoActual.descripcionCups = p.descripcionCups || '';
            if (p.superficiesEstado) {
              estadoActual.superficies = { ...p.superficiesEstado };
            }
            this.piezasEstado.set(num, estadoActual);
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Sin odontograma previo cargado en backend, usando odontograma inicial.');
      }
    });
  }

  guardarEnBackend() {
    if (!this.historiaClinicaId) {
      this.mensajeEstado = 'No hay ID de historia clínica asignado.';
      return;
    }
    this.isSaving = true;
    this.mensajeEstado = 'Guardando odontograma en el servidor...';

    const piezasList: PiezaDental[] = Array.from(this.piezasEstado.values()).map(p => ({
      numeroPieza: p.numeroPieza,
      condicion: p.condicion,
      superficiesEstado: p.superficies as Record<string, string>,
      codigoCie10: p.codigoCie10,
      descripcionCie10: p.descripcionCie10,
      codigoCups: p.codigoCups,
      descripcionCups: p.descripcionCups,
      notas: p.notas
    }));

    const requestPayload = {
      piezas: piezasList,
      observaciones: `Odontograma actualizado con códigos CIE-10 y CUPS (Sistema FDI)`
    };

    this.odontogramaService.guardarOdontograma(this.historiaClinicaId, requestPayload).subscribe({
      next: (resp) => {
        this.isSaving = false;
        this.mensajeEstado = '✅ Odontograma guardado exitosamente con códigos CIE-10 y CUPS.';
        this.versionActual = `Versión ${resp.version} (${new Date(resp.fechaRegistro).toLocaleDateString('es-CO')})`;
        this.guardarOdontograma.emit(resp);
        setTimeout(() => this.mensajeEstado = '', 3500);
      },
      error: (err) => {
        this.isSaving = false;
        this.mensajeEstado = '❌ Error al guardar en el servidor.';
        console.error('Error guardando odontograma:', err);
      }
    });
  }

  obtenerTipoDiente(numPieza: number): TipoDiente {
    const unidades = numPieza % 10;
    if (unidades === 1 || unidades === 2) return 'incisivo';
    if (unidades === 3) return 'canino';
    if (unidades === 4 || unidades === 5) return 'premolar';
    return 'molar';
  }

  obtenerPathCorona(numPieza: number): string {
    const tipo = this.obtenerTipoDiente(numPieza);
    switch (tipo) {
      case 'molar':
        return 'M4,28 C4,16 8,8 14,6 C17,4 23,4 26,6 C32,8 36,16 36,28 Z';
      case 'premolar':
        return 'M7,28 C7,17 10,9 16,6 C18,5 22,5 24,6 C30,9 33,17 33,28 Z';
      case 'canino':
        return 'M10,28 C10,20 14,10 20,4 C26,10 30,20 30,28 Z';
      case 'incisivo':
        return 'M11,28 C11,22 12,12 14,8 C16,5 24,5 26,8 C28,12 29,22 29,28 Z';
    }
  }

  obtenerPathRaiz(numPieza: number): string {
    const tipo = this.obtenerTipoDiente(numPieza);
    switch (tipo) {
      case 'molar':
        return 'M4,4 C4,16 6,26 9,32 M36,4 C36,16 34,26 31,32 M20,4 L20,28';
      case 'premolar':
        return 'M10,4 C9,14 8,22 8,32 M30,4 C31,14 32,22 32,32';
      case 'canino':
        return 'M12,4 C11,12 13,24 20,32 C27,24 29,12 28,4';
      case 'incisivo':
        return 'M14,4 C13,12 14,22 20,30 C26,22 27,12 26,4';
    }
  }

  toggleSeleccionPieza(numPieza: number) {
    const index = this.piezasSeleccionadas.indexOf(numPieza);
    if (index > -1) {
      this.piezasSeleccionadas.splice(index, 1);
    } else {
      this.piezasSeleccionadas.push(numPieza);
    }
  }

  esPiezaSeleccionada(numPieza: number): boolean {
    return this.piezasSeleccionadas.includes(numPieza);
  }

  abrirModalDiagnostico() {
    if (this.piezasSeleccionadas.length === 0) return;
    this.pasoModal = 'condicion';
    this.diagnosticoSeleccionadoTemp = null;
    this.cie10Seleccionado = null;
    this.cupsSeleccionado = null;
    this.cie10Filtro = '';
    this.cupsFiltro = '';
    this.modalDiagnosticoAbierto = true;
  }

  cerrarModalDiagnostico() {
    this.modalDiagnosticoAbierto = false;
  }

  seleccionarCondicionYPasarACie10(diag: any) {
    this.diagnosticoSeleccionadoTemp = diag;
    // Buscar sugerencia por defecto de CIE-10 y CUPS
    const sugCie10 = this.catalogoCie10.find(c => c.codigo === diag.defaultCie10);
    if (sugCie10) {
      this.cie10Seleccionado = sugCie10;
    }
    const sugCups = this.catalogoCups.find(c => c.codigo === diag.defaultCups);
    if (sugCups) {
      this.cupsSeleccionado = sugCups;
    }
    this.pasoModal = 'cie10';
  }

  pasarACups() {
    this.pasoModal = 'cups';
  }

  seleccionarCie10(item: Cie10Item) {
    this.cie10Seleccionado = item;
  }

  seleccionarCups(item: CupsItem) {
    this.cupsSeleccionado = item;
  }

  filtrarCie10(): Cie10Item[] {
    if (!this.cie10Filtro.trim()) return this.catalogoCie10;
    const q = this.cie10Filtro.toLowerCase();
    return this.catalogoCie10.filter(c =>
      c.codigo.toLowerCase().includes(q) ||
      c.descripcion.toLowerCase().includes(q) ||
      c.categoria.toLowerCase().includes(q)
    );
  }

  filtrarCups(): CupsItem[] {
    if (!this.cupsFiltro.trim()) return this.catalogoCups;
    const q = this.cupsFiltro.toLowerCase();
    return this.catalogoCups.filter(c =>
      c.codigo.toLowerCase().includes(q) ||
      c.descripcion.toLowerCase().includes(q) ||
      c.categoria.toLowerCase().includes(q)
    );
  }

  finalizarDiagnostico() {
    const diag = this.diagnosticoSeleccionadoTemp;
    const cie = this.cie10Seleccionado;
    const cups = this.cupsSeleccionado;

    this.piezasSeleccionadas.forEach(num => {
      const estado = this.piezasEstado.get(num);
      if (estado && diag) {
        if (diag.type === 'pieza') {
          estado.condicion = diag.id;
        } else if (diag.type === 'superficie') {
          estado.superficies = {
            ...estado.superficies,
            oclusalIncisal: diag.color,
            vestibular: diag.color,
            mesial: diag.color,
            distal: diag.color,
            lingualPalatina: diag.color
          };
          estado.condicion = diag.id;
        }
        if (cie) {
          estado.codigoCie10 = cie.codigo;
          estado.descripcionCie10 = cie.descripcion;
        }
        if (cups) {
          estado.codigoCups = cups.codigo;
          estado.descripcionCups = cups.descripcion;
        }
      }
    });

    this.cerrarModalDiagnostico();
    this.piezasSeleccionadas = [];
  }

  obtenerColorSuperficie(numPieza: number, sup: string): string {
    const estado = this.piezasEstado.get(numPieza);
    if (estado && (estado.superficies as any)[sup]) {
      return (estado.superficies as any)[sup];
    }
    return '#f5fafa';
  }

  obtenerColorCondicion(numPieza: number): string {
    const estado = this.piezasEstado.get(numPieza);
    if (!estado || estado.condicion === 'SANO') return '#d4eeee';
    const condicionColores: Record<string, string> = {
      AUSENTE: '#7f8c8d',
      EXTRACCION_INDICADA: '#c0392b',
      CORONA: '#3498db',
      CORONA_PROVISORIA: '#f39c12',
      IMPLANTE: '#2c3e50',
      ENDODONCIA: '#9b59b6',
      PERNO_MUNON: '#16a085',
      FRACTURA: '#e84393'
    };
    return condicionColores[estado.condicion] || '#d4eeee';
  }

  obtenerTooltipPieza(numPieza: number): string {
    const estado = this.piezasEstado.get(numPieza);
    if (!estado) return `Pieza FDI ${numPieza}`;
    let text = `Pieza FDI ${numPieza}: ${estado.condicion}`;
    if (estado.codigoCie10) {
      text += ` | CIE-10 [${estado.codigoCie10}]: ${estado.descripcionCie10}`;
    }
    if (estado.codigoCups) {
      text += ` | CUPS [${estado.codigoCups}]: ${estado.descripcionCups}`;
    }
    return text;
  }
}
