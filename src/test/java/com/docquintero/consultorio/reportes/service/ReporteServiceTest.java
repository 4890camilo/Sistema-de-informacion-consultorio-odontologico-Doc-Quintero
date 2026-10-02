package com.docquintero.consultorio.reportes.service;

import com.docquintero.consultorio.citas.model.Cita;
import com.docquintero.consultorio.citas.model.EstadoCita;
import com.docquintero.consultorio.citas.repo.CitaRepository;
import com.docquintero.consultorio.pacientes.repo.PacienteRepository;
import com.docquintero.consultorio.reportes.model.ReporteSummary;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReporteServiceTest {

    @Mock
    private PacienteRepository pacienteRepo;

    @Mock
    private CitaRepository citaRepo;

    @InjectMocks
    private ReporteService reporteService;

    @Test
    void testObtenerResumen() {
        when(pacienteRepo.count()).thenReturn(10L);
        when(citaRepo.count()).thenReturn(5L);

        Cita c1 = Cita.builder().estado(EstadoCita.ATENDIDA).build();
        Cita c2 = Cita.builder().estado(EstadoCita.CONFIRMADA).build();
        Cita c3 = Cita.builder().estado(EstadoCita.ANULADA).build();

        when(citaRepo.findAll()).thenReturn(List.of(c1, c2, c3));

        ReporteSummary summary = reporteService.obtenerResumen();

        assertNotNull(summary);
        assertEquals(10L, summary.getTotalPacientes());
        assertEquals(5L, summary.getTotalCitas());
        assertEquals(2L, summary.getCitasCompletadas());
        assertEquals(1L, summary.getCitasCanceladas());
        assertEquals(240000.0, summary.getTotalIngresosEstimados());
    }
}
