package com.docquintero.consultorio.historiaclinica.dto;

import com.docquintero.consultorio.historiaclinica.model.PiezaDental;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record OdontogramaRequest(
    @NotEmpty List<PiezaDental> piezas,
    String observaciones,
    String odontologoId
) {}
