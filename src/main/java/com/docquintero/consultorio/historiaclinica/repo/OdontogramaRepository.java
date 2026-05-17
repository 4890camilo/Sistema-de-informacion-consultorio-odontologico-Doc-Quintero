package com.docquintero.consultorio.historiaclinica.repo;

import com.docquintero.consultorio.historiaclinica.model.Odontograma;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface OdontogramaRepository extends MongoRepository<Odontograma, String> {
    List<Odontograma> findByHistoriaClinicaIdOrderByVersionDesc(String historiaClinicaId);
    Optional<Odontograma> findFirstByHistoriaClinicaIdAndActivoTrueOrderByVersionDesc(String historiaClinicaId);
}
