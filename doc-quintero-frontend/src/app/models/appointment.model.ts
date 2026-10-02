export interface AppointmentRequest {
  pacienteId: string;
  fechaHora: string;
  tipo: string;
  duracionBloque: number;
  notas?: string;
  comentarioInterno?: string;
  notificarPaciente?: boolean;
}

export interface AppointmentResponse {
  id: string;
  pacienteId: string;
  patientName?: string;
  odontologoId?: string;
  fechaHora: string;
  tipo: string;
  estado?: string;
  status?: string;
  duracionMinutos?: number;
  duracionBloque?: number;
  notas?: string;
  notes?: string;
  comentarioInterno?: string;
  notificarPaciente?: boolean;
  historialEstados?: any[];
  history?: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentListItem {
  id: string;
  patientName: string;
  dateTime: string;
  type: string;
  status: string;
  duracionBloque: number;
  notes?: string;
}

export interface AppointmentReportItem extends AppointmentListItem {}

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
  available: boolean;
}
