export interface ToothState {
  toothNumber: number;
  state: string; // e.g., 'HEALTHY', 'CAVIDAD', 'TREATED'
  notes?: string;
}

export interface MedicalHistoryRequest {
  patientId: string;
  reasonForConsultation: string;
  currentIllness: string;
  pastMedicalHistory?: string;
  familyHistory?: string;
  medications?: string;
  allergies?: string;
  dentalHistory?: string;
  extraoralExam?: string;
  intraoralExam?: string;
  teethStates?: ToothState[];
}

export interface MedicalHistoryResponse extends MedicalHistoryRequest {
  id: string;
  patientName: string;
  dateCreated: string;
  lastUpdated: string;
}

export interface MedicalHistoryListItem {
  id: string;
  patientName: string;
  reasonForConsultation: string;
  dateCreated: string;
}
