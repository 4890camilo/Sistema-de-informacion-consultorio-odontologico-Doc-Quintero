package com.docquintero.consultorio.service;

import com.docquintero.consultorio.model.TreatmentEvolution;
import com.docquintero.consultorio.model.Patient;
import com.docquintero.consultorio.model.User;
import com.docquintero.consultorio.repository.MedicalHistoryRepository;
import com.docquintero.consultorio.repository.PatientRepository;
import com.docquintero.consultorio.repository.TreatmentEvolutionRepository;
import com.docquintero.consultorio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TreatmentEvolutionService {

    @Autowired
    private TreatmentEvolutionRepository treatmentEvolutionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @PreAuthorize("hasRole('ODONTOLOGO')")
    public TreatmentEvolution createTreatmentEvolution(String patientId, String description) {
        // Check if medical history exists
        if (!medicalHistoryRepository.findByPatientId(patientId).isPresent()) {
            throw new IllegalArgumentException("Debe registrar primero la historia clínica inicial del paciente");
        }

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Paciente no encontrado"));

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User dentist = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Dentista no encontrado"));

        TreatmentEvolution evolution = new TreatmentEvolution();
        evolution.setPatient(patient);
        evolution.setDentist(dentist);
        evolution.setDescription(description);
        evolution.setDateTime(LocalDateTime.now());

        return treatmentEvolutionRepository.save(evolution);
    }

    public List<TreatmentEvolution> getTreatmentEvolutions(String patientId) {
        return treatmentEvolutionRepository.findByPatientIdOrderByDateTimeDesc(patientId);
    }
}