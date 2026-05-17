package com.docquintero.consultorio.interfaces;

import com.docquintero.consultorio.historiaclinica.dto.HistoriaClinicaRequest;
import com.docquintero.consultorio.historiaclinica.dto.HistoriaClinicaResponse;

public interface IHistoriaClinicaService {
    HistoriaClinicaResponse obtenerPorPaciente(String pacienteId);
    HistoriaClinicaResponse crear(HistoriaClinicaRequest request);
    HistoriaClinicaResponse actualizar(String id, HistoriaClinicaRequest request);
}
