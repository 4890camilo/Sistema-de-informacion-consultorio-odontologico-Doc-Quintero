package com.docquintero.consultorio.citas.dto;

import com.docquintero.consultorio.citas.model.TipoCita;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record CitaRequest(
    @NotBlank String pacienteId,
    @NotBlank String odontologoId,
    @NotNull LocalDateTime fechaHora,
    @NotNull Integer duracionMinutos,
    @NotNull Integer duracionBloque, // 15, 30, 45, 60
    @NotNull TipoCita tipo,
    String notas,
    String comentarioInterno,
    boolean notificarPaciente
) {}
