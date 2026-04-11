export interface PeriodontalData {
  toothNumber: number; // 1-32
  probingDepth?: number; // mm
  bleeding?: boolean;
  recession?: number; // mm
  attachment?: number; // mm
  notes?: string;
}

export interface PeriodontogramaRequest {
  patientId: string;
  periodontalData: PeriodontalData[];
  diagnosis?: string; // e.g., 'Gingivitis', 'Periodontitis Stage I-IV'
  treatmentPlan?: string;
}

export interface PeriodontogramaResponse extends PeriodontogramaRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
}
