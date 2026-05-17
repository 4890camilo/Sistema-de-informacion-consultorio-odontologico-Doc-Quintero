package com.docquintero.consultorio.historiaclinica.dto;

import com.docquintero.consultorio.historiaclinica.model.RegistroPeriodontal;
import java.time.LocalDateTime;
import java.util.List;

public record PeriodontogramaResponse(
    String id,
    String historiaClinicaId,
    Integer version,
    LocalDateTime fechaRegistro,
    List<RegistroPeriodontal> registros,
    String odontologoId,
    boolean activo
) {}
