package com.docquintero.consultorio.reportes.service;

import com.docquintero.consultorio.citas.model.EstadoCita;
import com.docquintero.consultorio.citas.repo.CitaRepository;
import com.docquintero.consultorio.pacientes.repo.PacienteRepository;
import com.docquintero.consultorio.reportes.model.ReporteSummary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReporteService {

    @Autowired
    private PacienteRepository pacienteRepo;

    @Autowired
    private CitaRepository citaRepo;

    public ReporteSummary obtenerResumen() {
        long totalPacientes = pacienteRepo.count();
        long totalCitas = citaRepo.count();
        long completadas = citaRepo.findAll().stream().filter(c -> c.getEstado() == EstadoCita.ATENDIDA || c.getEstado() == EstadoCita.CONFIRMADA).count();
        long canceladas = citaRepo.findAll().stream().filter(c -> c.getEstado() == EstadoCita.ANULADA || c.getEstado() == EstadoCita.NO_ASISTIO).count();
        double ingresos = completadas * 120000.0; // Estimado promedio por cita atendida ($120.000 COP)

        return ReporteSummary.builder()
                .totalPacientes(totalPacientes)
                .totalCitas(totalCitas)
                .citasCompletadas(completadas)
                .citasCanceladas(canceladas)
                .totalIngresosEstimados(ingresos)
                .build();
    }
}
