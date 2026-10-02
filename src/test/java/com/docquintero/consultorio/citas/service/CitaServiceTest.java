package com.docquintero.consultorio.citas.service;

import com.docquintero.consultorio.citas.dto.CitaRequest;
import com.docquintero.consultorio.citas.dto.CitaResponse;
import com.docquintero.consultorio.citas.model.Cita;
import com.docquintero.consultorio.citas.model.EstadoCita;
import com.docquintero.consultorio.citas.model.TipoCita;
import com.docquintero.consultorio.citas.repo.CitaRepository;
import com.docquintero.consultorio.pacientes.model.Paciente;
import com.docquintero.consultorio.pacientes.repo.PacienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CitaServiceTest {

    @Mock
    private CitaRepository repo;

    @Mock
    private PacienteRepository pacienteRepo;

    @InjectMocks
    private CitaService service;

    private Cita cita;
    private Paciente paciente;

    @BeforeEach
    void setUp() {
        cita = Cita.builder()
                .id("cita1")
                .pacienteId("pac1")
                .odontologoId("odo1")
                .fechaHora(LocalDateTime.of(2026, 3, 10, 10, 0))
                .duracionMinutos(30)
                .duracionBloque(30)
                .tipo(TipoCita.CONSULTA_GENERAL)
                .estado(EstadoCita.RESERVADA)
                .build();

        paciente = Paciente.builder()
                .id("pac1")
                .firstName("Carlos")
                .lastName("Ramirez")
                .phone("3001234567")
                .identificationNumber("10203040")
                .build();
    }

    @Test
    void testListarTodas() {
        when(repo.findAll()).thenReturn(List.of(cita));
        when(pacienteRepo.findById("pac1")).thenReturn(Optional.of(paciente));

        List<CitaResponse> result = service.listarTodas();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Carlos Ramirez", result.get(0).patientName());
    }

    @Test
    void testObtenerPorIdExitoso() {
        when(repo.findById("cita1")).thenReturn(Optional.of(cita));
        when(pacienteRepo.findById("pac1")).thenReturn(Optional.of(paciente));

        CitaResponse result = service.obtenerPorId("cita1");

        assertNotNull(result);
        assertEquals("cita1", result.id());
    }

    @Test
    void testObtenerPorIdNoExiste() {
        when(repo.findById("none")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.obtenerPorId("none"));
    }

    @Test
    void testCrearCita() {
        when(repo.save(any(Cita.class))).thenReturn(cita);
        when(pacienteRepo.findById("pac1")).thenReturn(Optional.of(paciente));

        CitaRequest request = new CitaRequest(
                "pac1", "odo1", LocalDateTime.of(2026, 3, 10, 10, 0),
                30, 30, TipoCita.CONSULTA_GENERAL, "Notas", "Comentario", false
        );

        CitaResponse response = service.crear(request);

        assertNotNull(response);
        assertEquals("pac1", response.pacienteId());
        verify(repo, times(1)).save(any(Cita.class));
    }
}
