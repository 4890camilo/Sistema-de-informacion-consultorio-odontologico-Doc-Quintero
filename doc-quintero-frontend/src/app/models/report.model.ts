export interface AppointmentReportItem {
  id: string;
  patientName: string;
  fechaHora: string;
  tipo: string;
  status: string;
  duracionBloque: number;
  notes?: string;
}

export interface ReportSummary {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalPatients: number;
  appointmentsByType: {
    [key: string]: number;
  };
}

export interface ReportFilter {
  startDate: string;
  endDate: string;
  appointmentType?: string;
  status?: string;
}
