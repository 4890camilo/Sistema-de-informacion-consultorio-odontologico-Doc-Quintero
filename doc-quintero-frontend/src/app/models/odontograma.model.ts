export type ToothState = 'HEALTHY' | 'CAVIDAD' | 'TREATED' | 'MISSING' | 'BROKEN' | 'EXTRACT';

export interface ToothData {
  toothNumber: number; // 1-32 (FDI notation)
  surface: string; // Occlusal, Buccal, Lingual, Mesial, Distal
  state: ToothState;
  notes?: string;
}

export interface OdontogramaRequest {
  patientId: string;
  teeth: ToothData[];
  generalCondition?: string; // Overall oral condition notes
}

export interface OdontogramaResponse extends OdontogramaRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
}
