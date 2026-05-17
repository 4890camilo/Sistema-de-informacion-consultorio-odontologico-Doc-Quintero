package com.docquintero.consultorio.interfaces;

import com.docquintero.consultorio.citas.dto.CitaEstadoRequest;
import com.docquintero.consultorio.citas.dto.CitaRequest;
import com.docquintero.consultorio.citas.dto.CitaResponse;
import java.time.LocalDateTime;
import java.util.List;

public interface ICitaService {
    List<CitaResponse> listarTodas();
    CitaResponse obtenerPorId(String id);
    List<CitaResponse> listarPorPaciente(String pacienteId);
    List<CitaResponse> listarPorRango(LocalDateTime desde, LocalDateTime hasta);
    CitaResponse crear(CitaRequest request);
    CitaResponse actualizar(String id, CitaRequest request);
    CitaResponse cambiarEstado(String id, CitaEstadoRequest request);
    void cancelar(String id);
}
