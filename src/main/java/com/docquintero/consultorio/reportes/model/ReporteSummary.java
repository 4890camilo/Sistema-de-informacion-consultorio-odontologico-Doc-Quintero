package com.docquintero.consultorio.reportes.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteSummary {
    private long totalPacientes;
    private long totalCitas;
    private long citasCompletadas;
    private long citasCanceladas;
    private double totalIngresosEstimados;
}
