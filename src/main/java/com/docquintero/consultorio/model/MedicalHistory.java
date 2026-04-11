package com.docquintero.consultorio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Document(collection = "medical_histories")
public class MedicalHistory {

    @Id
    private String id;
    @DBRef
    private Patient patient;
    @DBRef
    private User dentist; // Odontólogo que registra

    // Anamnesis
    private String reasonForConsultation;
    private String currentIllness;
    private String pastMedicalHistory;
    private String familyHistory;
    private String medications;
    private String allergies;

    // Antecedentes odontológicos
    private String dentalHistory;

    // Examen clínico
    private String extraoralExam;
    private String intraoralExam;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public MedicalHistory() {}

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setDentist(User dentist) {
        this.dentist = dentist;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public Patient getPatient() {
        return patient;
    }

    public User getDentist() {
        return dentist;
    }

    public String getReasonForConsultation() {
        return reasonForConsultation;
    }

    public String getCurrentIllness() {
        return currentIllness;
    }

    public String getPastMedicalHistory() {
        return pastMedicalHistory;
    }

    public String getFamilyHistory() {
        return familyHistory;
    }

    public String getMedications() {
        return medications;
    }

    public String getAllergies() {
        return allergies;
    }

    public String getDentalHistory() {
        return dentalHistory;
    }

    public String getExtraoralExam() {
        return extraoralExam;
    }

    public String getIntraoralExam() {
        return intraoralExam;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}