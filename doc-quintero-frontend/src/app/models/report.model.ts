export interface AppointmentReportItem {
  id: string;
  pacienteId?: string;
  patientName?: string;
  fechaHora: string;
  tipo: string;
  estado?: string;
  status?: string;
  duracionMinutos?: number;
  duracionBloque?: number;
  notas?: string;
  notes?: string;
  comentarioInterno?: string;
}

export interface ReportSummary {
  totalPacientes: number;
  totalCitas: number;
  citasCompletadas: number;
  citasCanceladas: number;
  totalIngresosEstimados: number;
}

export interface ReportFilter {
  startDate: string;
  endDate: string;
  tipo?: string;
  status?: string;
}
