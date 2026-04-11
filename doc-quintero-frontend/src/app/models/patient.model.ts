export interface PatientRequest {
  identificationNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string; // ISO date format: YYYY-MM-DD
  phone?: string;
  email?: string;
  address?: string;
  // Clinical data
  bloodType?: string; // O+, O-, A+, A-, B+, B-, AB+, AB-
  allergies?: string;
  chronicDiseases?: string;
  currentMedications?: string;
  insurance?: string;
  insuranceNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface PatientResponse extends PatientRequest {
  id: string;
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
