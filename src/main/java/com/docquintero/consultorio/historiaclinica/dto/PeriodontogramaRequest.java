package com.docquintero.consultorio.historiaclinica.dto;

import com.docquintero.consultorio.historiaclinica.model.RegistroPeriodontal;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record PeriodontogramaRequest(
    @NotEmpty List<RegistroPeriodontal> registros,
    String odontologoId
) {}
