package com.docquintero.consultorio.historiaclinica.service;

import com.docquintero.consultorio.historiaclinica.dto.HistoriaClinicaRequest;
import com.docquintero.consultorio.historiaclinica.dto.HistoriaClinicaResponse;
import com.docquintero.consultorio.historiaclinica.model.HistoriaClinica;
import com.docquintero.consultorio.historiaclinica.repo.HistoriaClinicaRepository;
import com.docquintero.consultorio.interfaces.IHistoriaClinicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HistoriaClinicaService implements IHistoriaClinicaService {

    @Autowired
    private HistoriaClinicaRepository repo;

    public HistoriaClinicaResponse obtenerPorPaciente(String pacienteId) {
        return repo.findByPacienteId(pacienteId).map(this::mapToResponse)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Historia clínica no encontrada"));
    }

    @Override
    public HistoriaClinicaResponse crear(HistoriaClinicaRequest request) {
        if (repo.findByPacienteId(request.pacienteId()).isPresent()) {
            throw new RuntimeException("El paciente ya tiene una historia clínica");
        }
        HistoriaClinica hc = HistoriaClinica.builder()
                .pacienteId(request.pacienteId())
                .anamnesis(request.anamnesis())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return mapToResponse(repo.save(hc));
    }

    @Override
    public HistoriaClinicaResponse actualizar(String id, HistoriaClinicaRequest request) {
        HistoriaClinica hc = repo.findById(id).orElseThrow(() -> new RuntimeException("Historia clínica no encontrada"));
        hc.setAnamnesis(request.anamnesis());
        hc.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(repo.save(hc));
    }

    private HistoriaClinicaResponse mapToResponse(HistoriaClinica hc) {
        return new HistoriaClinicaResponse(
                hc.getId(), hc.getPacienteId(), hc.getAnamnesis(),
                hc.getCreatedAt(), hc.getUpdatedAt()
        );
    }
}
