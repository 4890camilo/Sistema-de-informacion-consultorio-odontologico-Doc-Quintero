package com.docquintero.consultorio.historiaclinica.service;

import com.docquintero.consultorio.historiaclinica.dto.HistoriaClinicaRequest;
import com.docquintero.consultorio.historiaclinica.dto.HistoriaClinicaResponse;
import com.docquintero.consultorio.historiaclinica.model.Anamnesis;
import com.docquintero.consultorio.historiaclinica.model.HistoriaClinica;
import com.docquintero.consultorio.historiaclinica.repo.HistoriaClinicaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HistoriaClinicaServiceTest {

    @Mock
    private HistoriaClinicaRepository repo;

    @InjectMocks
    private HistoriaClinicaService service;

    private HistoriaClinica hc;

    @BeforeEach
    void setUp() {
        hc = HistoriaClinica.builder()
                .id("hc1")
                .pacienteId("pac1")
                .anamnesis(Anamnesis.builder().motivoConsulta("Dolor de muela").build())
                .build();
    }

    @Test
    void testObtenerPorPacienteExitoso() {
        when(repo.findByPacienteId("pac1")).thenReturn(Optional.of(hc));

        HistoriaClinicaResponse res = service.obtenerPorPaciente("pac1");

        assertNotNull(res);
        assertEquals("pac1", res.pacienteId());
    }

    @Test
    void testObtenerPorPacienteNoExiste() {
        when(repo.findByPacienteId("none")).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> service.obtenerPorPaciente("none"));
    }

    @Test
    void testCrearHistoriaClinicaExitoso() {
        when(repo.findByPacienteId("pac1")).thenReturn(Optional.empty());
        when(repo.save(any(HistoriaClinica.class))).thenReturn(hc);

        HistoriaClinicaRequest req = new HistoriaClinicaRequest("pac1", Anamnesis.builder().motivoConsulta("Dolor").build());
        HistoriaClinicaResponse res = service.crear(req);

        assertNotNull(res);
        assertEquals("pac1", res.pacienteId());
        verify(repo, times(1)).save(any(HistoriaClinica.class));
    }

    @Test
    void testCrearHistoriaClinicaDuplicada() {
        when(repo.findByPacienteId("pac1")).thenReturn(Optional.of(hc));

        HistoriaClinicaRequest req = new HistoriaClinicaRequest("pac1", Anamnesis.builder().motivoConsulta("Dolor").build());

        assertThrows(RuntimeException.class, () -> service.crear(req));
        verify(repo, never()).save(any(HistoriaClinica.class));
    }
}
