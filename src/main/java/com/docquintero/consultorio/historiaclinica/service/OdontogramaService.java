package com.docquintero.consultorio.historiaclinica.service;

import com.docquintero.consultorio.historiaclinica.dto.OdontogramaRequest;
import com.docquintero.consultorio.historiaclinica.dto.OdontogramaResponse;
import com.docquintero.consultorio.historiaclinica.model.Odontograma;
import com.docquintero.consultorio.historiaclinica.repo.OdontogramaRepository;
import com.docquintero.consultorio.interfaces.IOdontogramaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OdontogramaService implements IOdontogramaService {

    @Autowired
    private OdontogramaRepository repo;

    @Override
    public List<OdontogramaResponse> listarVersiones(String hcId) {
        return repo.findByHistoriaClinicaIdOrderByVersionDesc(hcId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OdontogramaResponse obtenerActual(String hcId) {
        return repo.findFirstByHistoriaClinicaIdAndActivoTrueOrderByVersionDesc(hcId)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("No hay odontograma activo para esta historia clínica"));
    }

    @Override
    public OdontogramaResponse crearNuevaVersion(String hcId, OdontogramaRequest request) {
        Integer lastVersion = repo.findByHistoriaClinicaIdOrderByVersionDesc(hcId).stream()
                .findFirst()
                .map(Odontograma::getVersion)
                .orElse(0);

        Odontograma odontograma = Odontograma.builder()
                .historiaClinicaId(hcId)
                .version(lastVersion + 1)
                .fechaRegistro(LocalDateTime.now())
                .piezas(request.piezas())
                .observaciones(request.observaciones())
                .odontologoId(request.odontologoId())
                .activo(true)
                .build();

        return mapToResponse(repo.save(odontograma));
    }

    @Override
    public void anularVersion(String id) {
        Odontograma o = repo.findById(id).orElseThrow(() -> new RuntimeException("Odontograma no encontrado"));
        o.setActivo(false);
        repo.save(o);
    }

    private OdontogramaResponse mapToResponse(Odontograma o) {
        return new OdontogramaResponse(
                o.getId(), o.getHistoriaClinicaId(), o.getVersion(), o.getFechaRegistro(),
                o.getPiezas(), o.getObservaciones(), o.getOdontologoId(), o.isActivo()
        );
    }
}
