package com.docquintero.consultorio.reportes.dto;

import com.docquintero.consultorio.citas.model.EstadoCita;
import java.time.LocalDateTime;

public record ReporteFilterRequest(
    LocalDateTime desde,
    LocalDateTime hasta,
    EstadoCita estado,
    String odontologoId
) {}
