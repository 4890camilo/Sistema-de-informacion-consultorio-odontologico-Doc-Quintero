package com.docquintero.consultorio.historiaclinica.controller;

import com.docquintero.consultorio.historiaclinica.dto.HistoriaClinicaRequest;
import com.docquintero.consultorio.historiaclinica.dto.HistoriaClinicaResponse;
import com.docquintero.consultorio.interfaces.IHistoriaClinicaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/historia-clinica")
@Tag(name = "Historia Clínica", description = "Gestión de historias clínicas de pacientes")
public class HistoriaClinicaController {

    @Autowired
    private IHistoriaClinicaService service;

    @GetMapping("/paciente/{pid}")
    @Operation(summary = "Obtener historia clínica por paciente")
    public ResponseEntity<HistoriaClinicaResponse> obtenerPorPaciente(@PathVariable String pid) {
        return ResponseEntity.ok(service.obtenerPorPaciente(pid));
    }

    @PostMapping
    @Operation(summary = "Crear historia clínica")
    public ResponseEntity<HistoriaClinicaResponse> crear(@Valid @RequestBody HistoriaClinicaRequest request) {
        return ResponseEntity.ok(service.crear(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar historia clínica")
    public ResponseEntity<HistoriaClinicaResponse> actualizar(@PathVariable String id, @Valid @RequestBody HistoriaClinicaRequest request) {
        return ResponseEntity.ok(service.actualizar(id, request));
    }
}
