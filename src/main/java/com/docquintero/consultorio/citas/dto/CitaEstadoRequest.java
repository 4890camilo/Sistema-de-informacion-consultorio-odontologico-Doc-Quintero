package com.docquintero.consultorio.citas.dto;

import com.docquintero.consultorio.citas.model.EstadoCita;
import jakarta.validation.constraints.NotNull;

public record CitaEstadoRequest(
    @NotNull EstadoCita estado,
    String motivoCancelacion
) {}
