package com.docquintero.consultorio.interfaces;

import com.docquintero.consultorio.historiaclinica.dto.OdontogramaRequest;
import com.docquintero.consultorio.historiaclinica.dto.OdontogramaResponse;
import java.util.List;

public interface IOdontogramaService {
    List<OdontogramaResponse> listarVersiones(String hcId);
    OdontogramaResponse obtenerActual(String hcId);
    OdontogramaResponse crearNuevaVersion(String hcId, OdontogramaRequest request);
    void anularVersion(String id);
}
