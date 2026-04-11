package com.docquintero.consultorio.dto;

import java.time.LocalDate;

public class PatientResponse {
    private String id;
    private String identificationNumber;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String phone;
    private String email;
    private String address;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    public PatientResponse() {}

    public PatientResponse(String id, String identificationNumber, String firstName, String lastName, LocalDate birthDate, String phone, String email, String address, String emergencyContactName, String emergencyContactPhone, LocalDate createdAt, LocalDate updatedAt) {
        this.id = id;
        this.identificationNumber = identificationNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }
}