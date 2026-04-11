package com.docquintero.consultorio.dto;

import java.time.LocalDateTime;

public class AppointmentResponse {
    private String id;
    private PatientResponse patient;
    private LocalDateTime dateTime;
    private String type;
    private String status;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AppointmentResponse() {}

    public AppointmentResponse(String id, PatientResponse patient, LocalDateTime dateTime, String type, String status, String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.patient = patient;
        this.dateTime = dateTime;
        this.type = type;
        this.status = status;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public PatientResponse getPatient() {
        return patient;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public String getType() {
        return type;
    }

    public String getStatus() {
        return status;
    }

    public String getNotes() {
        return notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}