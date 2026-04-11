export interface AppointmentRequest {
  patientId: string;
  dateTime: string; // ISO datetime format
  type: string; // e.g., 'EMERGENCY', 'ROUTINE', 'FOLLOWUP'
  notes?: string;
}

export interface AppointmentResponse extends AppointmentRequest {
  id: string;
  patientName: string;
  status: string; // 'SCHEDULED', 'COMPLETED', 'CANCELLED'
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface AppointmentListItem {
  id: string;
  patientName: string;
  dateTime: string;
  type: string;
  status: string;
  notes?: string;
}

export interface AppointmentReportItem {
  id: string;
  patientName: string;
  dateTime: string;
  type: string;
  status: string;
  notes?: string;
}
