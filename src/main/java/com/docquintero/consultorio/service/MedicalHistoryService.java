package com.docquintero.consultorio.service;

import com.docquintero.consultorio.model.MedicalHistory;
import com.docquintero.consultorio.model.Patient;
import com.docquintero.consultorio.model.User;
import com.docquintero.consultorio.repository.MedicalHistoryRepository;
import com.docquintero.consultorio.repository.PatientRepository;
import com.docquintero.consultorio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("hasRole('ODONTOLOGO')")
    public MedicalHistory createMedicalHistory(String patientId, MedicalHistory history) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Paciente no encontrado"));

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User dentist = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Dentista no encontrado"));

        history.setPatient(patient);
        history.setDentist(dentist);
        history.setCreatedAt(LocalDateTime.now());
        history.setUpdatedAt(LocalDateTime.now());

        return medicalHistoryRepository.save(history);
    }

    public MedicalHistory getMedicalHistory(String patientId) {
        return medicalHistoryRepository.findByPatientId(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Historia clínica no encontrada"));
    }
}