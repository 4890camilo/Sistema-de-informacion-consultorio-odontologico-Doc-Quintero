package com.docquintero.consultorio.historiaclinica.service;

import com.docquintero.consultorio.historiaclinica.dto.PeriodontogramaRequest;
import com.docquintero.consultorio.historiaclinica.dto.PeriodontogramaResponse;
import com.docquintero.consultorio.historiaclinica.model.Periodontograma;
import com.docquintero.consultorio.historiaclinica.model.RegistroPeriodontal;
import com.docquintero.consultorio.historiaclinica.repo.PeriodontogramaRepository;
import com.docquintero.consultorio.interfaces.IPeriodontogramaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PeriodontogramaService implements IPeriodontogramaService {

    @Autowired
    private PeriodontogramaRepository repo;

    @Override
    public List<PeriodontogramaResponse> listarControles(String hcId) {
        return repo.findByHistoriaClinicaIdOrderByVersionDesc(hcId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PeriodontogramaResponse obtenerActual(String hcId) {
        return repo.findFirstByHistoriaClinicaIdAndActivoTrueOrderByVersionDesc(hcId)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("No hay periodontograma activo"));
    }

    @Override
    public PeriodontogramaResponse crearNuevoControl(String hcId, PeriodontogramaRequest request) {
        // Calcular NIC para cada registro
        for (RegistroPeriodontal registro : request.registros()) {
            if (!registro.isAusente()) {
                int[] nic = new int[6];
                for (int i = 0; i < 6; i++) {
                    nic[i] = registro.getProfundidadSondaje()[i] + registro.getMargenGingival()[i];
                }
                registro.setNivelInsercion(nic);
            }
        }

        Integer lastVersion = repo.findByHistoriaClinicaIdOrderByVersionDesc(hcId).stream()
                .findFirst()
                .map(Periodontograma::getVersion)
                .orElse(0);

        Periodontograma periodontograma = Periodontograma.builder()
                .historiaClinicaId(hcId)
                .version(lastVersion + 1)
                .fechaRegistro(LocalDateTime.now())
                .registros(request.registros())
                .odontologoId(request.odontologoId())
                .activo(true)
                .build();

        return mapToResponse(repo.save(periodontograma));
    }

    @Override
    public void anularControl(String id) {
        Periodontograma p = repo.findById(id).orElseThrow(() -> new RuntimeException("Periodontograma no encontrado"));
        p.setActivo(false);
        repo.save(p);
    }

    private PeriodontogramaResponse mapToResponse(Periodontograma p) {
        return new PeriodontogramaResponse(
                p.getId(), p.getHistoriaClinicaId(), p.getVersion(), p.getFechaRegistro(),
                p.getRegistros(), p.getOdontologoId(), p.isActivo()
        );
    }
}
