package com.docquintero.consultorio.historiaclinica.dto;

import com.docquintero.consultorio.historiaclinica.model.PiezaDental;
import java.time.LocalDateTime;
import java.util.List;

public record OdontogramaResponse(
    String id,
    String historiaClinicaId,
    Integer version,
    LocalDateTime fechaRegistro,
    List<PiezaDental> piezas,
    String observaciones,
    String odontologoId,
    boolean activo
) {}
