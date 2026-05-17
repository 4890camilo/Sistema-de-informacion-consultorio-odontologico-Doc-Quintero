package com.docquintero.consultorio.historiaclinica.controller;

import com.docquintero.consultorio.historiaclinica.dto.PeriodontogramaRequest;
import com.docquintero.consultorio.historiaclinica.dto.PeriodontogramaResponse;
import com.docquintero.consultorio.interfaces.IPeriodontogramaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historia-clinica/{hcId}/periodontograma")
@Tag(name = "Periodontograma", description = "Controles periodontales por historia clínica")
public class PeriodontogramaController {

    @Autowired
    private IPeriodontogramaService service;

    @GetMapping
    @Operation(summary = "Obtener todos los controles periodontales")
    public ResponseEntity<List<PeriodontogramaResponse>> listarControles(@PathVariable String hcId) {
        return ResponseEntity.ok(service.listarControles(hcId));
    }

    @GetMapping("/actual")
    @Operation(summary = "Obtener control periodontal más reciente")
    public ResponseEntity<PeriodontogramaResponse> obtenerActual(@PathVariable String hcId) {
        return ResponseEntity.ok(service.obtenerActual(hcId));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo control periodontal")
    public ResponseEntity<PeriodontogramaResponse> crear(@PathVariable String hcId, @Valid @RequestBody PeriodontogramaRequest request) {
        return ResponseEntity.ok(service.crearNuevoControl(hcId, request));
    }

    @PatchMapping("/{pid}/anular")
    @Operation(summary = "Anular control periodontal")
    public ResponseEntity<Void> anular(@PathVariable String pid) {
        service.anularControl(pid);
        return ResponseEntity.noContent().build();
    }
}
