package com.docquintero.consultorio.service;

import com.docquintero.consultorio.dto.PatientRequest;
import com.docquintero.consultorio.dto.PatientResponse;
import com.docquintero.consultorio.model.Patient;
import com.docquintero.consultorio.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @PreAuthorize("hasRole('AUXILIAR')")
    public PatientResponse createPatient(PatientRequest request) {
        if (patientRepository.existsByIdentificationNumber(request.getIdentificationNumber())) {
            throw new IllegalArgumentException("Paciente ya registrado");
        }

        Patient patient = new Patient();
        patient.setIdentificationNumber(request.getIdentificationNumber());
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setBirthDate(request.getBirthDate());
        patient.setPhone(request.getPhone());
        patient.setEmail(request.getEmail());
        patient.setAddress(request.getAddress());
        patient.setEmergencyContactName(request.getEmergencyContactName());
        patient.setEmergencyContactPhone(request.getEmergencyContactPhone());
        patient.setCreatedAt(LocalDate.now());
        patient.setUpdatedAt(LocalDate.now());

        Patient saved = patientRepository.save(patient);
        return mapToResponse(saved);
    }

    @PreAuthorize("hasRole('AUXILIAR')")
    public PatientResponse updatePatient(String id, PatientRequest request) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Paciente no encontrado"));

        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setBirthDate(request.getBirthDate());
        patient.setPhone(request.getPhone());
        patient.setEmail(request.getEmail());
        patient.setAddress(request.getAddress());
        patient.setEmergencyContactName(request.getEmergencyContactName());
        patient.setEmergencyContactPhone(request.getEmergencyContactPhone());
        patient.setUpdatedAt(LocalDate.now());

        Patient saved = patientRepository.save(patient);
        return mapToResponse(saved);
    }

    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PatientResponse getPatientById(String id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Paciente no encontrado"));
        return mapToResponse(patient);
    }

    private PatientResponse mapToResponse(Patient patient) {
        return new PatientResponse(
                patient.getId(),
                patient.getIdentificationNumber(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getBirthDate(),
                patient.getPhone(),
                patient.getEmail(),
                patient.getAddress(),
                patient.getEmergencyContactName(),
                patient.getEmergencyContactPhone(),
                patient.getCreatedAt(),
                patient.getUpdatedAt()
        );
    }
}