export interface Anamnesis {
  motivoConsulta: string;
  enTratamientoMedico: boolean;
  detalleTratamiento?: string;
  medicamentos?: string;
  alergias?: string;
  enfermedadesSistemicas: string[];
  habitos: string[];
  antecedentesQuirurgicos?: string;
  antecedentesOdontologicos?: string;
  embarazo: boolean;
  alertasMedicas?: string;
  comentarios?: string;
}

export interface MedicalHistoryRequest {
  pacienteId: string;
  anamnesis: Anamnesis;
}

export interface MedicalHistoryResponse {
  id: string;
  pacienteId: string;
  anamnesis: Anamnesis;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalHistoryListItem {
  id: string;
  pacienteId: string;
  motivoConsulta: string;
  createdAt: string;
}
