package com.docquintero.consultorio.pacientes.service;

import com.docquintero.consultorio.interfaces.IPacienteService;
import com.docquintero.consultorio.pacientes.dto.PacienteRequest;
import com.docquintero.consultorio.pacientes.dto.PacienteResponse;
import com.docquintero.consultorio.pacientes.model.Paciente;
import com.docquintero.consultorio.pacientes.repo.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService implements IPacienteService {

    @Autowired
    private PacienteRepository repo;

    @Override
    public List<PacienteResponse> listar(String q) {
        List<Paciente> pacientes;
        if (q != null && !q.isEmpty()) {
            pacientes = repo.searchActive(q);
        } else {
            pacientes = repo.findAll();
        }
        return pacientes.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public PacienteResponse obtenerPorId(String id) {
        Paciente p = repo.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        return mapToResponse(p);
    }

    @Override
    public PacienteResponse obtenerPorCedula(String num) {
        Paciente p = repo.findByIdentificationNumber(num).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        return mapToResponse(p);
    }

    @Override
    public PacienteResponse crear(PacienteRequest request) {
        if (repo.findByIdentificationNumber(request.identificationNumber()).isPresent()) {
            throw new RuntimeException("Cédula ya registrada");
        }
        Paciente p = Paciente.builder()
                .identificationNumber(request.identificationNumber())
                .tipoDocumento(request.tipoDocumento())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .nombreSocial(request.nombreSocial())
                .birthDate(request.birthDate())
                .sexo(request.sexo())
                .genero(request.genero())
                .email(request.email())
                .phone(request.phone())
                .telefonoFijo(request.telefonoFijo())
                .address(request.address())
                .ciudad(request.ciudad())
                .departamento(request.departamento())
                .bloodType(request.bloodType())
                .allergies(request.allergies())
                .chronicDiseases(request.chronicDiseases())
                .currentMedications(request.currentMedications())
                .insurance(request.insurance())
                .insuranceNumber(request.insuranceNumber())
                .ocupacion(request.ocupacion())
                .empleador(request.empleador())
                .tipoPaciente(request.tipoPaciente())
                .comoNosConocio(request.comoNosConocio())
                .observaciones(request.observaciones())
                .acudiente(request.acudiente())
                .active(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return mapToResponse(repo.save(p));
    }

    @Override
    public PacienteResponse actualizar(String id, PacienteRequest request) {
        Paciente p = repo.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        p.setIdentificationNumber(request.identificationNumber());
        p.setTipoDocumento(request.tipoDocumento());
        p.setFirstName(request.firstName());
        p.setLastName(request.lastName());
        p.setNombreSocial(request.nombreSocial());
        p.setBirthDate(request.birthDate());
        p.setSexo(request.sexo());
        p.setGenero(request.genero());
        p.setEmail(request.email());
        p.setPhone(request.phone());
        p.setTelefonoFijo(request.telefonoFijo());
        p.setAddress(request.address());
        p.setCiudad(request.ciudad());
        p.setDepartamento(request.departamento());
        p.setBloodType(request.bloodType());
        p.setAllergies(request.allergies());
        p.setChronicDiseases(request.chronicDiseases());
        p.setCurrentMedications(request.currentMedications());
        p.setInsurance(request.insurance());
        p.setInsuranceNumber(request.insuranceNumber());
        p.setOcupacion(request.ocupacion());
        p.setEmpleador(request.empleador());
        p.setTipoPaciente(request.tipoPaciente());
        p.setComoNosConocio(request.comoNosConocio());
        p.setObservaciones(request.observaciones());
        p.setAcudiente(request.acudiente());
        p.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(repo.save(p));
    }

    @Override
    public void desactivar(String id) {
        Paciente p = repo.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        p.setActive(false);
        p.setUpdatedAt(LocalDateTime.now());
        repo.save(p);
    }

    private PacienteResponse mapToResponse(Paciente p) {
        return new PacienteResponse(
                p.getId(), p.getIdentificationNumber(), p.getTipoDocumento(),
                p.getFirstName(), p.getLastName(), p.getNombreSocial(),
                p.getBirthDate(), p.getSexo(), p.getGenero(),
                p.getEmail(), p.getPhone(), p.getTelefonoFijo(),
                p.getAddress(), p.getCiudad(), p.getDepartamento(),
                p.getBloodType(), p.getAllergies(), p.getChronicDiseases(),
                p.getCurrentMedications(), p.getInsurance(), p.getInsuranceNumber(),
                p.getOcupacion(), p.getEmpleador(), p.getTipoPaciente(),
                p.getComoNosConocio(), p.getObservaciones(), p.getAcudiente(),
                p.isActive(), p.getCreatedAt(), p.getUpdatedAt()
        );
    }
}
