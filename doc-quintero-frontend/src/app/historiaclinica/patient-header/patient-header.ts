import { Component, Input } from '@angular/core';

export interface PatientHeaderInfo {
  id: string;
  identificationNumber: string;
  fullName: string;
  ageYears: number;
  ageMonths: number;
  agreement: string;
  medicalAlerts: string[];
  diseases: string[];
  medications: string[];
}

import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-patient-header',
  imports: [CommonModule],
  templateUrl: './patient-header.html',
  styleUrls: ['./patient-header.scss']
})
export class PatientHeaderComponent {
  @Input() patient!: PatientHeaderInfo;
  @Input() activeTab: string = 'odontograma';
}
