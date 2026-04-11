package com.docquintero.consultorio.repository;

import com.docquintero.consultorio.model.MedicalHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MedicalHistoryRepository extends MongoRepository<MedicalHistory, String> {
    Optional<MedicalHistory> findByPatientId(String patientId);
}