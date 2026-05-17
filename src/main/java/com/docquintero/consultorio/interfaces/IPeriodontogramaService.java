package com.docquintero.consultorio.interfaces;

import com.docquintero.consultorio.historiaclinica.dto.PeriodontogramaRequest;
import com.docquintero.consultorio.historiaclinica.dto.PeriodontogramaResponse;
import java.util.List;

public interface IPeriodontogramaService {
    List<PeriodontogramaResponse> listarControles(String hcId);
    PeriodontogramaResponse obtenerActual(String hcId);
    PeriodontogramaResponse crearNuevoControl(String hcId, PeriodontogramaRequest request);
    void anularControl(String id);
}
