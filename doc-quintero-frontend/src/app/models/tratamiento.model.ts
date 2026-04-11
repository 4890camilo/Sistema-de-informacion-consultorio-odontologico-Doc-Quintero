export type TreatmentStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TreatmentType = 'PROPHYLAXIS' | 'CLEANING' | 'FILLING' | 'ROOT_CANAL' | 'EXTRACTION' | 'IMPLANT' | 'ORTHODONTICS' | 'WHITENING' | 'OTHER';

export interface TratamientoRequest {
  patientId: string;
  type: TreatmentType;
  description: string;
  tooth?: number; // Optional: which tooth
  startDate: string; // ISO datetime
  estimatedEndDate?: string;
  status: TreatmentStatus;
  cost?: number;
  notes?: string;
}

export interface TratamientoResponse extends TratamientoRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  endDate?: string;
}

export interface TratamientoListItem {
  id: string;
  type: TreatmentType;
  description: string;
  status: TreatmentStatus;
  startDate: string;
  tooth?: number;
}
