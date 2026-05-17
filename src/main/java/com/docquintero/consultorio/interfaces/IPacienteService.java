package com.docquintero.consultorio.interfaces;

import com.docquintero.consultorio.pacientes.dto.PacienteRequest;
import com.docquintero.consultorio.pacientes.dto.PacienteResponse;
import java.util.List;

public interface IPacienteService {
    List<PacienteResponse> listar(String q);
    PacienteResponse obtenerPorId(String id);
    PacienteResponse obtenerPorCedula(String num);
    PacienteResponse crear(PacienteRequest request);
    PacienteResponse actualizar(String id, PacienteRequest request);
    void desactivar(String id);
}
