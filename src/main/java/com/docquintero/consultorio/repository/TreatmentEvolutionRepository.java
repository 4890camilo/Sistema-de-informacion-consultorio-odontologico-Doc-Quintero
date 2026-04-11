package com.docquintero.consultorio.repository;

import com.docquintero.consultorio.model.TreatmentEvolution;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TreatmentEvolutionRepository extends MongoRepository<TreatmentEvolution, String> {
    List<TreatmentEvolution> findByPatientIdOrderByDateTimeDesc(String patientId);
}