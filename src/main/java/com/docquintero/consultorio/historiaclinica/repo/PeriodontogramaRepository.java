package com.docquintero.consultorio.historiaclinica.repo;

import com.docquintero.consultorio.historiaclinica.model.Periodontograma;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface PeriodontogramaRepository extends MongoRepository<Periodontograma, String> {
    List<Periodontograma> findByHistoriaClinicaIdOrderByVersionDesc(String historiaClinicaId);
    Optional<Periodontograma> findFirstByHistoriaClinicaIdAndActivoTrueOrderByVersionDesc(String historiaClinicaId);
}
