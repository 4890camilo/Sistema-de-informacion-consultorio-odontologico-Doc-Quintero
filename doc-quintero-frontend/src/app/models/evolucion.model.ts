export interface EvolucionRequest {
  patientId: string;
  date: string; // ISO datetime
  findings: string; // Clinical findings
  symptoms?: string;
  treatment?: string;
  nextFollowUp?: string; // ISO datetime
}

export interface EvolucionResponse extends EvolucionRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvolucionListItem {
  id: string;
  date: string;
  findings: string;
  treatment?: string;
}
