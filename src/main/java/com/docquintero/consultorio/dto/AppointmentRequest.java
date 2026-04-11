package com.docquintero.consultorio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class AppointmentRequest {
    @NotBlank(message = "ID del paciente es obligatorio")
    private String patientId;

    @NotNull(message = "Fecha y hora son obligatorias")
    private LocalDateTime dateTime;

    @NotBlank(message = "Tipo de cita es obligatorio")
    private String type;

    private String notes;

    public AppointmentRequest() {}

    public String getPatientId() {
        return patientId;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public String getType() {
        return type;
    }

    public String getNotes() {
        return notes;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}