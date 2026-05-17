package com.docquintero.consultorio.citas.dto;

import com.docquintero.consultorio.citas.model.EstadoCita;
import com.docquintero.consultorio.citas.model.TipoCita;
import java.time.LocalDateTime;

import com.docquintero.consultorio.citas.model.Cita;
import java.util.List;

public record CitaResponse(
    String id,
    String pacienteId,
    String odontologoId,
    LocalDateTime fechaHora,
    Integer duracionMinutos,
    Integer duracionBloque,
    TipoCita tipo,
    EstadoCita estado,
    String notas,
    String comentarioInterno,
    boolean notificarPaciente,
    List<Cita.EstadoHistorial> historialEstados,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
