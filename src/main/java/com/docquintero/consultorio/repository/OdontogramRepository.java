package com.docquintero.consultorio.repository;

import com.docquintero.consultorio.model.Odontogram;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OdontogramRepository extends MongoRepository<Odontogram, String> {
    List<Odontogram> findByPatientIdOrderByCreatedAtDesc(String patientId);
}