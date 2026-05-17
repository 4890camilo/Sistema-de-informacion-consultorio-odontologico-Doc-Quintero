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
  patientName: string;
  fechaHora: string;
  tipo: string;
  status: string;
  duracionBloque: number;
  notes: string;
  comentarioInterno?: string;
  notificarPaciente: boolean;
  history: any[];
  createdAt: string;
  updatedAt: string;
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
