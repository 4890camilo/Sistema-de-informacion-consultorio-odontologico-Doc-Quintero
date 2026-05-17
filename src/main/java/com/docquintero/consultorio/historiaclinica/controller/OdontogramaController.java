package com.docquintero.consultorio.historiaclinica.controller;

import com.docquintero.consultorio.historiaclinica.dto.OdontogramaRequest;
import com.docquintero.consultorio.historiaclinica.dto.OdontogramaResponse;
import com.docquintero.consultorio.interfaces.IOdontogramaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historia-clinica/{hcId}/odontograma")
@Tag(name = "Odontograma", description = "Versiones del odontograma por historia clínica")
public class OdontogramaController {

    @Autowired
    private IOdontogramaService service;

    @GetMapping
    @Operation(summary = "Obtener todas las versiones del odontograma")
    public ResponseEntity<List<OdontogramaResponse>> listarVersiones(@PathVariable String hcId) {
        return ResponseEntity.ok(service.listarVersiones(hcId));
    }

    @GetMapping("/actual")
    @Operation(summary = "Obtener versión más reciente del odontograma")
    public ResponseEntity<OdontogramaResponse> obtenerActual(@PathVariable String hcId) {
        return ResponseEntity.ok(service.obtenerActual(hcId));
    }

    @PostMapping
    @Operation(summary = "Crear nueva versión de odontograma")
    public ResponseEntity<OdontogramaResponse> crear(@PathVariable String hcId, @Valid @RequestBody OdontogramaRequest request) {
        return ResponseEntity.ok(service.crearNuevaVersion(hcId, request));
    }

    @PatchMapping("/{oid}/anular")
    @Operation(summary = "Anular versión de odontograma")
    public ResponseEntity<Void> anular(@PathVariable String oid) {
        service.anularVersion(oid);
        return ResponseEntity.noContent().build();
    }
}
