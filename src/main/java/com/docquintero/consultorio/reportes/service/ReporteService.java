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
        long completadas = citaRepo.findAll().stream().filter(c -> c.getEstado() == EstadoCita.ATENDIDA).count();
        long canceladas = citaRepo.findAll().stream().filter(c -> c.getEstado() == EstadoCita.ANULADA).count();

        return ReporteSummary.builder()
                .totalPacientes(totalPacientes)
                .totalCitas(totalCitas)
                .citasCompletadas(completadas)
                .citasCanceladas(canceladas)
                .build();
    }
}
