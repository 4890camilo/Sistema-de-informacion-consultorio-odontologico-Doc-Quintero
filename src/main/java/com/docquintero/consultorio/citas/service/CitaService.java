package com.docquintero.consultorio.citas.service;

import com.docquintero.consultorio.citas.dto.CitaEstadoRequest;
import com.docquintero.consultorio.citas.dto.CitaRequest;
import com.docquintero.consultorio.citas.dto.CitaResponse;
import com.docquintero.consultorio.citas.model.Cita;
import com.docquintero.consultorio.citas.model.EstadoCita;
import com.docquintero.consultorio.citas.repo.CitaRepository;
import com.docquintero.consultorio.interfaces.ICitaService;
import com.docquintero.consultorio.pacientes.model.Paciente;
import com.docquintero.consultorio.pacientes.repo.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CitaService implements ICitaService {

    @Autowired
    private CitaRepository repo;

    @Autowired
    private PacienteRepository pacienteRepo;

    @Override
    public List<CitaResponse> listarTodas() {
        return repo.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public CitaResponse obtenerPorId(String id) {
        return repo.findById(id).map(this::mapToResponse).orElseThrow(() -> new RuntimeException("Cita no encontrada"));
    }

    @Override
    public List<CitaResponse> listarPorPaciente(String pacienteId) {
        return repo.findByPacienteId(pacienteId).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<CitaResponse> listarPorRango(LocalDateTime desde, LocalDateTime hasta) {
        return repo.findByFechaHoraBetween(desde, hasta).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public CitaResponse crear(CitaRequest request) {
        Cita cita = Cita.builder()
                .pacienteId(request.pacienteId())
                .odontologoId(request.odontologoId())
                .fechaHora(request.fechaHora())
                .duracionMinutos(request.duracionMinutos())
                .duracionBloque(request.duracionBloque())
                .tipo(request.tipo())
                .estado(EstadoCita.RESERVADA)
                .notas(request.notas())
                .comentarioInterno(request.comentarioInterno())
                .notificarPaciente(request.notificarPaciente())
                .historialEstados(List.of(new Cita.EstadoHistorial(EstadoCita.RESERVADA, "SYSTEM", LocalDateTime.now())))
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return mapToResponse(repo.save(cita));
    }

    @Override
    public CitaResponse actualizar(String id, CitaRequest request) {
        Cita cita = repo.findById(id).orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setOdontologoId(request.odontologoId());
        cita.setFechaHora(request.fechaHora());
        cita.setDuracionMinutos(request.duracionMinutos());
        cita.setDuracionBloque(request.duracionBloque());
        cita.setTipo(request.tipo());
        cita.setNotas(request.notas());
        cita.setComentarioInterno(request.comentarioInterno());
        cita.setNotificarPaciente(request.notificarPaciente());
        cita.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(repo.save(cita));
    }

    @Override
    public CitaResponse reprogramar(String id, LocalDateTime nuevaFechaHora) {
        Cita cita = repo.findById(id).orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setFechaHora(nuevaFechaHora);
        cita.setEstado(EstadoCita.REPROGRAMADA);

        List<Cita.EstadoHistorial> historial = cita.getHistorialEstados();
        if (historial == null) {
            historial = new java.util.ArrayList<>();
        }
        historial.add(new Cita.EstadoHistorial(EstadoCita.REPROGRAMADA, "USUARIO_ACTUAL", LocalDateTime.now()));
        cita.setHistorialEstados(historial);
        cita.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(repo.save(cita));
    }

    @Override
    public CitaResponse cambiarEstado(String id, CitaEstadoRequest request) {
        Cita cita = repo.findById(id).orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        
        // Agregar al historial
        List<Cita.EstadoHistorial> historial = cita.getHistorialEstados();
        if (historial == null) {
            historial = new java.util.ArrayList<>();
        }
        historial.add(new Cita.EstadoHistorial(request.estado(), "USUARIO_ACTUAL", LocalDateTime.now()));
        
        cita.setEstado(request.estado());
        cita.setHistorialEstados(historial);
        cita.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(repo.save(cita));
    }

    @Override
    public void cancelar(String id) {
        Cita cita = repo.findById(id).orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setEstado(EstadoCita.ANULADA);
        
        List<Cita.EstadoHistorial> historial = cita.getHistorialEstados();
        if (historial == null) {
            historial = new java.util.ArrayList<>();
        }
        historial.add(new Cita.EstadoHistorial(EstadoCita.ANULADA, "SYSTEM", LocalDateTime.now()));
        cita.setHistorialEstados(historial);
        
        cita.setUpdatedAt(LocalDateTime.now());
        repo.save(cita);
    }

    private CitaResponse mapToResponse(Cita cita) {
        String patientName = "Paciente";
        if (cita.getPacienteId() != null && !cita.getPacienteId().isBlank()) {
            try {
                Optional<Paciente> pacienteOpt = pacienteRepo.findById(cita.getPacienteId());
                if (pacienteOpt.isPresent()) {
                    Paciente p = pacienteOpt.get();
                    String firstName = p.getFirstName() != null ? p.getFirstName().trim() : "";
                    String lastName = p.getLastName() != null ? p.getLastName().trim() : "";
                    String fullName = (firstName + " " + lastName).trim();
                    if (!fullName.isBlank()) {
                        patientName = fullName;
                    }
                }
            } catch (Exception ignored) {
            }
        }

        return new CitaResponse(
                cita.getId(), cita.getPacienteId(), patientName, cita.getOdontologoId(),
                cita.getFechaHora(), cita.getDuracionMinutos(), cita.getDuracionBloque(),
                cita.getTipo(), cita.getEstado(), cita.getNotas(),
                cita.getComentarioInterno(), cita.isNotificarPaciente(),
                cita.getHistorialEstados(),
                cita.getCreatedAt(), cita.getUpdatedAt()
        );
    }
}
