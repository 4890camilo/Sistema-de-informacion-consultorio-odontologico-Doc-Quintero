export interface PatientRequest {
  identificationNumber: string;
  tipoDocumento: string;
  firstName: string;
  lastName: string;
  nombreSocial?: string;
  birthDate?: string; // ISO date format: YYYY-MM-DD
  sexo?: string;
  genero?: string;
  email?: string;
  phone?: string;
  telefonoFijo?: string;
  address?: string;
  ciudad?: string;
  departamento?: string;
  bloodType?: string; // O+, O-, A+, A-, B+, B-, AB+, AB-
  allergies?: string;
  chronicDiseases?: string;
  currentMedications?: string;
  insurance?: string;
  insuranceNumber?: string;
  ocupacion?: string;
  empleador?: string;
  tipoPaciente?: string;
  comoNosConocio?: string;
  observaciones?: string;
  acudiente?: {
    nombre?: string;
    identificacion?: string;
    parentesco?: string;
    telefono?: string;
  };
}

export interface PatientResponse extends PatientRequest {
  id: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PatientListItem {
  id: string;
  identificationNumber: string;
  firstName: string;
  lastName: string;
  bloodType?: string;
  phone?: string;
}
