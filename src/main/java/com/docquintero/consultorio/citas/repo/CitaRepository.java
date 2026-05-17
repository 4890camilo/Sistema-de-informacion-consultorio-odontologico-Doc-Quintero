package com.docquintero.consultorio.citas.repo;

import com.docquintero.consultorio.citas.model.Cita;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface CitaRepository extends MongoRepository<Cita, String> {
    List<Cita> findByPacienteId(String pacienteId);
    List<Cita> findByFechaHoraBetween(LocalDateTime start, LocalDateTime end);
}
