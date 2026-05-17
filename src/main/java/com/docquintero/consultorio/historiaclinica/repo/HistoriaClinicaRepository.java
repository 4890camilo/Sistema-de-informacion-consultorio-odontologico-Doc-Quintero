package com.docquintero.consultorio.historiaclinica.repo;

import com.docquintero.consultorio.historiaclinica.model.HistoriaClinica;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface HistoriaClinicaRepository extends MongoRepository<HistoriaClinica, String> {
    Optional<HistoriaClinica> findByPacienteId(String pacienteId);
}
