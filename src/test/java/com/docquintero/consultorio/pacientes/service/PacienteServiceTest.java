package com.docquintero.consultorio.pacientes.service;

import com.docquintero.consultorio.pacientes.dto.PacienteRequest;
import com.docquintero.consultorio.pacientes.dto.PacienteResponse;
import com.docquintero.consultorio.pacientes.model.Paciente;
import com.docquintero.consultorio.pacientes.repo.PacienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PacienteServiceTest {

    @Mock
    private PacienteRepository repo;

    @InjectMocks
    private PacienteService service;

    private Paciente paciente;

    @BeforeEach
    void setUp() {
        paciente = Paciente.builder()
                .id("pac1")
                .identificationNumber("10203040")
                .tipoDocumento("CC")
                .firstName("Carlos")
                .lastName("Ramirez")
                .email("carlos@test.com")
                .phone("3001234567")
                .birthDate(LocalDate.of(1990, 1, 1))
                .active(true)
                .build();
    }

    @Test
    void testListarTodos() {
        when(repo.findByActiveTrue()).thenReturn(List.of(paciente));

        List<PacienteResponse> result = service.listar(null);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Carlos", result.get(0).firstName());
        verify(repo, times(1)).findByActiveTrue();
    }

    @Test
    void testListarConFiltro() {
        when(repo.searchActive("Carlos")).thenReturn(List.of(paciente));

        List<PacienteResponse> result = service.listar("Carlos");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Carlos", result.get(0).firstName());
        verify(repo, times(1)).searchActive("Carlos");
    }

    @Test
    void testObtenerPorIdExitoso() {
        when(repo.findById("pac1")).thenReturn(Optional.of(paciente));

        PacienteResponse response = service.obtenerPorId("pac1");

        assertNotNull(response);
        assertEquals("10203040", response.identificationNumber());
    }

    @Test
    void testObtenerPorIdNoEncontrado() {
        when(repo.findById("none")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.obtenerPorId("none"));
    }

    @Test
    void testCrearPacienteExitoso() {
        when(repo.findByIdentificationNumber("10203040")).thenReturn(Optional.empty());
        when(repo.save(any(Paciente.class))).thenReturn(paciente);

        PacienteRequest request = new PacienteRequest(
                "10203040", "CC", "Carlos", "Ramirez", null,
                LocalDate.of(1990, 1, 1), "M", "M", "carlos@test.com",
                "3001234567", null, "Calle 123", "Bogota", "Cundinamarca",
                "O+", null, null, null, "EPS Sánitas", "1234",
                "Ingeniero", "Empresa", "Particular", "Google", "Ninguna", null
        );

        PacienteResponse created = service.crear(request);

        assertNotNull(created);
        assertEquals("10203040", created.identificationNumber());
        verify(repo, times(1)).save(any(Paciente.class));
    }

    @Test
    void testCrearPacienteDuplicado() {
        when(repo.findByIdentificationNumber("10203040")).thenReturn(Optional.of(paciente));

        PacienteRequest request = new PacienteRequest(
                "10203040", "CC", "Carlos", "Ramirez", null,
                LocalDate.of(1990, 1, 1), "M", "M", "carlos@test.com",
                "3001234567", null, "Calle 123", "Bogota", "Cundinamarca",
                "O+", null, null, null, "EPS Sánitas", "1234",
                "Ingeniero", "Empresa", "Particular", "Google", "Ninguna", null
        );

        assertThrows(RuntimeException.class, () -> service.crear(request));
        verify(repo, never()).save(any(Paciente.class));
    }

    @Test
    void testDesactivarPaciente() {
        when(repo.findById("pac1")).thenReturn(Optional.of(paciente));
        when(repo.save(any(Paciente.class))).thenReturn(paciente);

        service.desactivar("pac1");

        assertFalse(paciente.isActive());
        verify(repo, times(1)).save(paciente);
    }
}
