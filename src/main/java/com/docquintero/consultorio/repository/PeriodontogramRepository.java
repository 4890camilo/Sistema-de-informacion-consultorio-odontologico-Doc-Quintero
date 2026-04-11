package com.docquintero.consultorio.repository;

import com.docquintero.consultorio.model.Periodontogram;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PeriodontogramRepository extends MongoRepository<Periodontogram, String> {
    List<Periodontogram> findByPatientIdOrderByCreatedAtDesc(String patientId);
}