package com.docquintero.consultorio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Document(collection = "treatment_evolutions")
public class TreatmentEvolution {

    @Id
    private String id;
    @DBRef
    private Patient patient;
    @DBRef
    private User dentist;
    private String description;
    private LocalDateTime dateTime;

    public TreatmentEvolution() {}

    public void setId(String id) {
        this.id = id;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setDentist(User dentist) {
        this.dentist = dentist;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
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

    public String getDescription() {
        return description;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }
}